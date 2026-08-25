import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { experiences as fallbackExperiences } from "@/lib/data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("order_index", { ascending: true })
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          return NextResponse.json(data);
        }
      } catch (sbErr) {
        console.warn("Supabase fetch experiences error, using fallback data.");
      }
    }
  } catch (error) {
    console.warn("Fetch experiences error, using fallback data.");
  }
  return NextResponse.json(fallbackExperiences);
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("experiences").insert([body]).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data, { status: 201 });
    }

    return NextResponse.json({ message: "Mock experience created", experience: body }, { status: 201 });
  } catch (error) {
    console.error("Create experience error:", error);
    return NextResponse.json({ error: "Failed to create experience." }, { status: 500 });
  }
}
