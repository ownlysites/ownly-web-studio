import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BriefPayload = {
  name?: string;
  email?: string;
  business?: string;
  phone?: string;
  industry?: string;
  budget?: string;
  current?: string;
  goal?: string;
  style?: string;
};

function clean(s: unknown, max = 2000): string | null {
  if (typeof s !== "string") return null;
  const trimmed = s.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(req: Request) {
  let body: BriefPayload = {};
  try {
    body = (await req.json()) as BriefPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const row = {
    name: clean(body.name, 200),
    email: clean(body.email, 320),
    business: clean(body.business, 200),
    phone: clean(body.phone, 64),
    industry: clean(body.industry, 64),
    budget: clean(body.budget, 64),
    current_website: clean(body.current, 500),
    goal: clean(body.goal),
    style_direction: clean(body.style),
    source: "ownly-web-studio.vercel.app",
    user_agent: clean(req.headers.get("user-agent"), 500),
  };

  if (!row.email && !row.phone) {
    return NextResponse.json(
      { ok: false, error: "Need email or phone." },
      { status: 422 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // No DB configured — still respond OK so the mailto fallback runs.
    console.warn("[submit-brief] Supabase not configured; brief not persisted.");
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("mockup_requests").insert(row);
  if (error) {
    console.error("[submit-brief] Supabase insert failed", error);
    return NextResponse.json({ ok: true, persisted: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
