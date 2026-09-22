import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxflDoml_ZXP7ZClj8T6bHz32C9gXhQI_mvucEvmMIz1EGqN8VLRsjuEB3-v7CiXnwN/exec"


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    body.formType = "Newsletter";

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    if (result.success) return NextResponse.json({ success: true, message: "Subscribed" });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}