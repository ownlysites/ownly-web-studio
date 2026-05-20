import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DBC_API = "https://services.leadconnectorhq.com";
const DBC_VERSION = "2021-07-28";

type Payload = {
  business: string;
  name: string;
  email: string;
  phone?: string;
  oneline?: string;
  tier: string;
  refs?: string;
  budget?: string;
  launch?: string;
  urgent?: string;
};

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" };
}

export async function POST(req: NextRequest) {
  const token = process.env.DBC_PIT_TOKEN;
  const locationId = process.env.DBC_LOCATION_ID;

  if (!token || !locationId) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !body.business || !body.name) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const { firstName, lastName } = splitName(body.name);

  const upsertBody = {
    locationId,
    firstName,
    lastName,
    email: body.email,
    phone: body.phone || undefined,
    companyName: body.business,
    source: "ownly-web-studio",
    tags: ["ownly_web_studio_intake", `tier:${body.tier}`],
    customFields: [
      { key: "web_studio_tier", field_value: body.tier },
      { key: "web_studio_budget", field_value: body.budget || "" },
      { key: "web_studio_oneline", field_value: body.oneline || "" },
      { key: "web_studio_refs", field_value: body.refs || "" },
      { key: "web_studio_launch", field_value: body.launch || "" },
      { key: "web_studio_urgent", field_value: body.urgent || "" },
    ],
  };

  try {
    const res = await fetch(`${DBC_API}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: DBC_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(upsertBody),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

    if (!res.ok) {
      console.error("[intake] DBC error", res.status, data);
      return NextResponse.json(
        { ok: false, error: "DBC upsert failed", status: res.status, detail: data },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, contactId: (data as { contact?: { id?: string } })?.contact?.id });
  } catch (e) {
    console.error("[intake] fetch error", e);
    return NextResponse.json({ ok: false, error: "Network error contacting DBC" }, { status: 502 });
  }
}
