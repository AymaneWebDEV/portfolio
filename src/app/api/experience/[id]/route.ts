import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const sanitized: Record<string, any> = {};
    if (body.type !== undefined) sanitized.type = body.type;
    if (body.title !== undefined) sanitized.title = body.title;
    if (body.organization !== undefined) sanitized.organization = body.organization;
    if (body.period !== undefined) sanitized.period = body.period;
    if (body.description !== undefined) sanitized.description = body.description;
    if (body.tags !== undefined) sanitized.tags = Array.isArray(body.tags) ? body.tags : [];
    if (body.details !== undefined) sanitized.details = Array.isArray(body.details) ? body.details : [];
    if (body.order_index !== undefined || body.order !== undefined) {
      sanitized.order_index = body.order_index ?? body.order ?? 0;
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("experiences").update(sanitized).eq("id", id).select().single();
      if (!error) return NextResponse.json(data);
      console.error("Supabase update experience error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, experience: sanitized });
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
      if (error) {
        console.error("Supabase delete experience error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete experience error:", error);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
