import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    if (isSupabaseConfigured && supabase) {
      // In case the table has a read column or other fields, update it gracefully
      const { data, error } = await supabase.from("contacts").update(body).eq("id", id).select().single();
      if (error) {
        // If column doesn't exist, ignore gracefully
        return NextResponse.json({ success: true, updated: false, note: error.message });
      }
      return NextResponse.json(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update contact error:", error);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) {
        console.error("Supabase contact delete error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }
}
