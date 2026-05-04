import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== 'WORKER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    // In a real app we'd map Worker Dashboard status 'Collected' -> 'RESOLVED', etc.
    const mappedStatus = status === 'Collected' ? 'RESOLVED' : 
                         status === 'Escalated' ? 'PENDING' : 
                         status === 'Skipped' ? 'PENDING' : status;

    const updated = await prisma.complaint.update({
      where: { id: resolvedParams.id },
      data: { status: mappedStatus },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating complaint:', error);
    return NextResponse.json({ error: 'Failed to update complaint' }, { status: 500 });
  }
}
