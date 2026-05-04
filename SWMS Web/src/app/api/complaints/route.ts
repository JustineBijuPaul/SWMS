import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const ward = searchParams.get('ward');

    // Build filter based on search params
    const filter: any = {};
    if (status) filter.status = status;
    if (ward) filter.location = { ward };

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
    const body = await request.json();
    const { user_id, location_id, category, description, image_url } = body;

    if (!user_id || !location_id || !category || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newComplaint = await prisma.complaint.create({
      data: {
        user_id,
        location_id,
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
