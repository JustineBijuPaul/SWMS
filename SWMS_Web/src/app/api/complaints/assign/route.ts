import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const role = (session.user as any).role;
    // Only admins or contractors can assign tasks
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { complaint_id, worker_id } = await request.json();

    if (!complaint_id || !worker_id) {
      return NextResponse.json({ error: 'Missing complaint_id or worker_id' }, { status: 400 });
    }

    // Wrap in transaction: create Assignment and update Complaint status
    const [assignment, complaint] = await prisma.$transaction([
      prisma.assignment.create({
        data: {
          complaint_id,
          worker_id,
          status: 'assigned',
        }
      }),
      prisma.complaint.update({
        where: { id: complaint_id },
        data: { status: 'ASSIGNED' }
      })
    ]);

    return NextResponse.json({ message: 'Task assigned successfully', assignment, complaint });
  } catch (error) {
    console.error('Error assigning task:', error);
    return NextResponse.json({ error: 'Failed to assign task' }, { status: 500 });
  }
}
