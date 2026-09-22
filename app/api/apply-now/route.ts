import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbd4g3n5R9o2L_0K-u9mDJpX6Jkjabdczr83tW2RXnZr0wjSDsdOhhUp9nhlnD7CA8/exec"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    body.formType = "ApplyNow"; // 🔑 Auto-routing ke liye

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    if (result.success) {
      return NextResponse.json({ success: true, redirectUrl: "/under-review" });
    }
    return NextResponse.json({ error: "Sheet save failed" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}