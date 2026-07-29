import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Forward to FormSubmit with proper Referer & User-Agent headers
    const formSubmitRes = await fetch("https://formsubmit.co/ajax/diyocd2004@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "http://localhost:3000/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: subject ? `Portfolio Message: ${subject}` : `New Portfolio Message from ${name}`,
        message,
        _captcha: "false",
        _template: "table",
      }),
    });

    const responseData = await formSubmitRes.json();

    if (responseData.success === "true" || formSubmitRes.ok) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    } else {
      console.error("FormSubmit rejected request:", responseData);
      return NextResponse.json(
        { success: false, error: responseData.message || "Email delivery failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: "Server network error. Please try again." },
      { status: 500 }
    );
  }
}
