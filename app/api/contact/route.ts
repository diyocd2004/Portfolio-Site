import { NextResponse } from "next/server";

// Simple in-memory rate limiting to prevent spam
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many messages sent. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, _honeypot } = body;

    // Honeypot spam protection — bots fill hidden inputs
    if (_honeypot) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Dynamically resolve origin for production (Vercel) and local compatibility
    const host = request.headers.get("host");
    const proto = request.headers.get("x-forwarded-proto") || "https";
    const origin =
      request.headers.get("origin") ||
      request.headers.get("referer") ||
      (host ? `${proto}://${host}` : "https://diyocd.vercel.app");

    // Forward to FormSubmit with proper Referer & User-Agent headers
    const formSubmitRes = await fetch("https://formsubmit.co/ajax/diyocd2004@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": origin,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        name: String(name).trim(),
        email: String(email).trim(),
        _subject: subject
          ? `Portfolio Message: ${String(subject).trim()}`
          : `New Portfolio Message from ${String(name).trim()}`,
        message: String(message).trim(),
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
