import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  try {
    const workers = await prisma.user.findMany({
      where: { role: 'WORKER' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        created_at: true,
      }
    });

    // If no workers exist (empty database), let's create a dummy one dynamically for the MVP demo
    if (workers.length === 0) {
      const password_hash = await bcrypt.hash('worker123', 10);
      const dummyWorker = await prisma.user.create({
        data: {
          name: 'Ram Kumar (Demo)',
          email: 'worker@swms.com',
          phone: '+919876543210',
          password_hash,
          role: 'WORKER'
        }
      });
      return NextResponse.json([{ ...dummyWorker, zone: 'Ward 12' }]);
    }

    // Map dummy zone data since we don't have full ContractorProfile zone logic fully built in schema yet
    const mappedWorkers = workers.map(w => ({
      ...w,
      zone: 'Ward ' + (Math.floor(Math.random() * 10) + 1)
    }));

    return NextResponse.json(mappedWorkers);
  } catch (error) {
    console.error('Error fetching workers:', error);
    return NextResponse.json({ error: 'Failed to fetch workers' }, { status: 500 });
  }
}
