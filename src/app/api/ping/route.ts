import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("projects").select("id").limit(1);
      if (!error) {
        return NextResponse.json(
          { status: "success", provider: "supabase", message: "Database active and responsive" },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { status: "ok", provider: "local", message: "Application responsive" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ping error:", error);
    return NextResponse.json(
      { status: "error", message: "Health check failed" },
      { status: 500 }
    );
  }
}
