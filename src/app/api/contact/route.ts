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

    // Send email alert to Ahmed Aymane via Resend
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
            from: "Portfolio Inquiries <onboarding@resend.dev>",
            to: ["aymaneharty@gmail.com"],
            subject: `[Portfolio Inquiry] ${subject} from ${name}`,
            text: `You received a new inquiry from your portfolio!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nView and manage inquiries in your Admin Panel: /admin/contact`,
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
