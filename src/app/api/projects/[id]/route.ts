import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { projects as fallbackProjects } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("projects").select("*").or(`id.eq.${id},slug.eq.${id}`).single();
      if (!error && data) {
        return NextResponse.json(data);
      }
    }

    const match = fallbackProjects.find((p) => p._id === id || p.slug === id || p.id === id);
    if (match) return NextResponse.json(match);

    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("projects").update(body).eq("id", id).select().single();
      if (!error) return NextResponse.json(data);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: body });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
