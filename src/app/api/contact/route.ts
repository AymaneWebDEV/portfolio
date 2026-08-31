import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    let insertedId = null;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("contacts").insert([
        { name, email, subject, message }
      ]).select().single();

      if (error) {
        console.error("Supabase contact insert error:", error);
      } else if (data) {
        insertedId = data.id;
      }
    }

    // Send email notification to Ahmed Aymane via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["aymaneharty@gmail.com"],
            subject: `📬 New message from ${name} — "${subject}"`,
            html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);padding:28px 32px;">
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase;">harty.web portfolio</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;">New Contact Message</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <!-- Sender info -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#242424;border-radius:12px;margin-bottom:24px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 12px;font-size:11px;color:#6b7280;letter-spacing:1px;text-transform:uppercase;">From</p>
                  <p style="margin:0 0 4px;font-size:17px;color:#f3f4f6;font-weight:600;">${name}</p>
                  <a href="mailto:${email}" style="color:#60a5fa;font-size:13px;text-decoration:none;">${email}</a>
                </td>
              </tr>
            </table>
            <!-- Subject -->
            <p style="margin:0 0 8px;font-size:11px;color:#6b7280;letter-spacing:1px;text-transform:uppercase;">Subject</p>
            <p style="margin:0 0 24px;font-size:15px;color:#e5e7eb;font-weight:600;padding:12px 16px;background:#242424;border-radius:8px;border-left:3px solid #8b5cf6;">${subject}</p>
            <!-- Message -->
            <p style="margin:0 0 8px;font-size:11px;color:#6b7280;letter-spacing:1px;text-transform:uppercase;">Message</p>
            <div style="background:#242424;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>
            <!-- CTA -->
            <div style="text-align:center;">
              <a href="https://harty.web/admin/contact" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px;">View in Admin Panel →</a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #2a2a2a;">
            <p style="margin:0;font-size:11px;color:#4b5563;text-align:center;">This notification was sent automatically from your portfolio at harty.web</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
          }),
        });
      } catch (emailErr) {
        console.warn("Contact notification email could not be sent:", emailErr);
      }
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", id: insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // SECURITY: Authenticate admin session
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .neq("subject", "__ADMIN_SETTINGS__")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return NextResponse.json(data);
      }
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
