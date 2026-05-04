import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';

    const complaints = await prisma.complaint.findMany({
      include: {
        user: { select: { name: true, phone: true } },
        location: true,
      },
      orderBy: { created_at: 'desc' },
    });

    if (format === 'csv') {
      const headers = 'ID,Category,Status,Description,Ward,City,State,Reporter,Created At\n';
      const rows = complaints.map(c =>
        `${c.id},${c.category},${c.status},"${c.description}",${c.location.ward},${c.location.city},${c.location.state},${c.user.name},${c.created_at.toISOString()}`
      ).join('\n');

      return new Response(headers + rows, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="swms_report.csv"',
        },
      });
    }

    // JSON summary report
    const total = complaints.length;
    const byStatus = {
      PENDING: complaints.filter(c => c.status === 'PENDING').length,
      ASSIGNED: complaints.filter(c => c.status === 'ASSIGNED').length,
      IN_PROGRESS: complaints.filter(c => c.status === 'IN_PROGRESS').length,
      RESOLVED: complaints.filter(c => c.status === 'RESOLVED').length,
    };
    const byCategory = {
      WET: complaints.filter(c => c.category === 'WET').length,
      DRY: complaints.filter(c => c.category === 'DRY').length,
      SANITARY: complaints.filter(c => c.category === 'SANITARY').length,
      HAZARDOUS: complaints.filter(c => c.category === 'HAZARDOUS').length,
    };

    // SLA: Count complaints resolved within 48 hours
    const resolvedComplaints = complaints.filter(c => c.status === 'RESOLVED');
    const withinSLA = resolvedComplaints.filter(c => {
      const diff = c.updated_at.getTime() - c.created_at.getTime();
      return diff <= 48 * 60 * 60 * 1000; // 48 hours
    }).length;

    return NextResponse.json({
      total,
      byStatus,
      byCategory,
      sla: {
        total_resolved: resolvedComplaints.length,
        within_sla: withinSLA,
        compliance_rate: resolvedComplaints.length > 0 ? Math.round((withinSLA / resolvedComplaints.length) * 100) : 100,
      },
      generated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
