import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// Force dynamic so Next.js never tries to statically render this route at build time
export const dynamic = 'force-dynamic';

// GET /api/keep-alive
// Called every 3 days by Vercel Cron to prevent Supabase free-tier pausing.
// Vercel automatically sends:  Authorization: Bearer <CRON_SECRET>
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Lightweight query — just proves the DB is reachable
  const { error } = await getSupabase()
    .from('feedback')
    .select('id')
    .limit(1);

  if (error) {
    console.error('[keep-alive] Supabase error:', error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  console.log('[keep-alive] Supabase ping successful at', new Date().toISOString());
  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() });
}
