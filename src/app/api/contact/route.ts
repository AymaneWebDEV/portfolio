import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("contacts").insert([
        { name, email, subject, message }
      ]).select().single();

      if (error) {
        console.error("Supabase contact insert error:", error);
      } else {
        return NextResponse.json(
          { success: true, message: "Message sent successfully!", id: data.id },
          { status: 201 }
        );
      }
    }

    // Graceful fallback response if database is not configured
    return NextResponse.json(
      { success: true, message: "Message sent successfully! (Demo mode)" },
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
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return NextResponse.json(data);
      }
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
