import { NextResponse } from "next/server";

/**
 * Contact form handler — delivers messages via Web3Forms (https://web3forms.com).
 *
 * Setup:
 *  1. Sign up at web3forms.com using ashishadhikari481@gmail.com (that inbox is
 *     the delivery target — Web3Forms sends to the address the key is registered
 *     under).
 *  2. Copy the Access Key and set it as the WEB3FORMS_ACCESS_KEY environment
 *     variable (locally in .env.local, and in the Netlify site settings).
 *
 * No SMTP, no credentials in the repo — the route just forwards to Web3Forms
 * over HTTPS, which is reliable on serverless hosts. It returns a real success
 * or error (it no longer pretends to succeed when unconfigured).
 */
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not set — cannot deliver message.");
      return NextResponse.json(
        { error: "Contact form is not configured yet." },
        { status: 503 }
      );
    }

    const result = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New portfolio message from ${name}`,
        from_name: "Portfolio Contact Form",
        name,
        email, // used by Web3Forms as the reply-to address
        replyto: email,
        message,
      }),
    });

    const data = await result.json().catch(() => ({}));

    if (!result.ok || !data.success) {
      console.error("Web3Forms delivery failed:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
