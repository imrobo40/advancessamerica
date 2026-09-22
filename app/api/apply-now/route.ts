import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxflDoml_ZXP7ZClj8T6bHz32C9gXhQI_mvucEvmMIz1EGqN8VLRsjuEB3-v7CiXnwN/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("FORM DATA:", body);

    body.formType = "ApplyNow";

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseText = await res.text();

    console.log("APPS SCRIPT STATUS:", res.status);
    console.log("APPS SCRIPT RESPONSE:", responseText);

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      console.error("INVALID JSON FROM APPS SCRIPT:", responseText);

      return NextResponse.json(
        {
          success: false,
          error: "Invalid response from Google Apps Script",
          details: responseText,
        },
        { status: 500 }
      );
    }

    console.log("FINAL RESULT:", result);

    if (result.success) {
      return NextResponse.json({
        success: true,
        redirectUrl: "/under-review",
        emailSent: result.emailSent,
        emailError: result.emailError,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: result.error || "Sheet save failed",
        emailError: result.emailError || null,
      },
      { status: 500 }
    );

  } catch (err) {
    console.error("API ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}