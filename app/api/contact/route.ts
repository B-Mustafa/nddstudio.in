import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // ── Gmail SMTP transporter ─────────────────────────────────────────────
    // Set these in your Vercel environment variables:
    //   GMAIL_USER  → your Gmail address (e.g. bhikhapurmustafa@gmail.com)
    //   GMAIL_PASS  → 16-char App Password from https://myaccount.google.com/apppasswords
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'DM Sans', Arial, sans-serif; background: #0D0D0D; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #111; border: 1px solid rgba(255,255,255,0.08); }
    .header { background: #E8630A; padding: 28px 32px; }
    .header-title { font-size: 18px; font-weight: 800; color: white; margin: 0; letter-spacing: -0.02em; }
    .header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 4px; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
    .field-value { font-size: 14px; color: #ffffff; font-weight: 400; line-height: 1.55; }
    .divider { height: 1px; background: rgba(255,255,255,0.07); margin: 20px 0; }
    .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.65; white-space: pre-wrap; }
    .footer { padding: 18px 32px; border-top: 1px solid rgba(255,255,255,0.07); }
    .footer p { font-size: 11px; color: rgba(255,255,255,0.2); margin: 0; }
    .badge { display: inline-block; background: rgba(232,99,10,0.15); border: 1px solid rgba(232,99,10,0.3); color: #E8630A; font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.08em; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="header-title">New project enquiry — NDD.Studio</div>
      <div class="header-sub">Submitted via nddstudio.in/contact</div>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${email}" style="color:#E8630A;">${email}</a></div>
      </div>
      ${phone ? `
      <div class="field">
        <div class="field-label">Phone / WhatsApp</div>
        <div class="field-value">${phone}</div>
      </div>` : ""}
      <div class="divider"></div>
      <div class="field">
        <div class="field-label">Service needed</div>
        <div class="field-value"><span class="badge">${service || "Not specified"}</span></div>
      </div>
      ${budget ? `
      <div class="field">
        <div class="field-label">Budget range</div>
        <div class="field-value">${budget}</div>
      </div>` : ""}
      <div class="divider"></div>
      <div class="field">
        <div class="field-label">Project details</div>
        <div class="message-box">${message}</div>
      </div>
    </div>
    <div class="footer">
      <p>NDD.Studio · nddstudio.in · Godhra, Gujarat, India</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"NDD.Studio Contact Form" <${process.env.GMAIL_USER}>`,
      to: "bhikhapurmustafa@gmail.com",
      replyTo: email,
      subject: `New enquiry from ${name} — ${service || "NDD.Studio"}`,
      html,
      text: `
New project enquiry — NDD.Studio
=================================
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
Service: ${service || "Not specified"}
Budget: ${budget || "Not specified"}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try emailing hello@nddstudio.in directly." },
      { status: 500 }
    );
  }
}
