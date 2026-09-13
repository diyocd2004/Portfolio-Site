import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not configured.");
      return NextResponse.json(
        { success: false, error: "Email configuration missing on server. Please add RESEND_API_KEY to environment variables." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

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

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanSubject = subject
      ? String(subject).trim()
      : `Portfolio Message from ${cleanName}`;
    const cleanMessage = String(message).trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["diyocd2004@gmail.com"],
      replyTo: cleanEmail,
      subject: `[Portfolio] ${cleanSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #8b1e3f; border-bottom: 2px solid #f7a8b8; padding-bottom: 8px;">New Message from Portfolio Website</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #555;">Name:</td>
              <td style="padding: 8px 0; color: #111;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #8b1e3f;">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 8px 0; color: #111;">${cleanSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #fdf6f7; border-left: 4px solid #8b1e3f; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #222; line-height: 1.6;">${cleanMessage}</p>
          </div>
          <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center;">
            Sent from Diyo C D's AI Security & Cybersecurity Portfolio
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { success: false, error: error.message || "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      id: data?.id,
    });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Server network error. Please try again." },
      { status: 500 }
    );
  }
}
