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
      const { data, error } = await supabase.from("experiences").update(body).eq("id", id).select().single();
      if (!error) return NextResponse.json(data);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, experience: body });
  } catch (error) {
    console.error("Update experience error:", error);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("experiences").delete().eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete experience error:", error);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
