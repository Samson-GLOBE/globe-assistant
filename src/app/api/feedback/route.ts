import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// Force dynamic so Next.js never tries to statically render this route at build time
export const dynamic = 'force-dynamic';

// GET /api/feedback — fetch all approved submissions, newest first
export async function GET() {
  const { data, error } = await getSupabase()
    .from('feedback')
    .select('id, created_at, name, cohort_year, destination, category, content')
    .eq('approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/feedback — submit a new experience
export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, cohort_year, destination, category, content } = body;

  if (!content || content.trim().length < 10) {
    return NextResponse.json(
      { error: 'Please write at least 10 characters.' },
      { status: 400 },
    );
  }

  if (content.trim().length > 1000) {
    return NextResponse.json(
      { error: 'Please keep your experience under 1000 characters.' },
      { status: 400 },
    );
  }

  const { error } = await getSupabase().from('feedback').insert([
    {
      name: name?.trim() || null,
      cohort_year: cohort_year?.trim() || null,
      destination: destination || null,
      category: category || null,
      content: content.trim(),
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
