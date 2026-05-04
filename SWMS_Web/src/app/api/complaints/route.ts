import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const ward = searchParams.get('ward');

    const filter: any = {};
    if (status) filter.status = status;
    if (ward) filter.location = { ward };

    // If it's a citizen, they only see their own complaints
    if ((session.user as any).role === 'CITIZEN') {
      filter.user_id = (session.user as any).id;
    }

    const complaints = await prisma.complaint.findMany({
      where: filter,
      include: {
        location: true,
        user: { select: { id: true, name: true, phone: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ error: 'Failed to fetch complaints' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { category, description, locationText, image_url } = body;

    if (!category || !description || !locationText) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upsert a default location or use the text as ward for now
    // In a real implementation we would geocode locationText -> city, ward, zone.
    let location = await prisma.location.findFirst({ where: { ward: locationText } });
    if (!location) {
      location = await prisma.location.create({
        data: {
          state: 'State',
          city: 'City',
          ward: locationText,
          pincode: '000000',
        }
      });
    }

    const newComplaint = await prisma.complaint.create({
      data: {
        user_id: (session.user as any).id,
        location_id: location.id,
        category,
        description,
        image_url,
      },
    });

    return NextResponse.json(newComplaint, { status: 201 });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json({ error: 'Failed to create complaint' }, { status: 500 });
  }
}
