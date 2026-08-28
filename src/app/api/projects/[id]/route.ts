import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { projects as fallbackProjects } from "@/lib/data";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isUUID = UUID_REGEX.test(id);

    if (isSupabaseConfigured && supabase) {
      const query = supabase.from("projects").select("*");
      const { data, error } = isUUID
        ? await query.eq("id", id).maybeSingle()
        : await query.eq("slug", id).maybeSingle();

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
    const isUUID = UUID_REGEX.test(id);
    const body = await request.json();

    // Map and sanitize keys to match Supabase schema
    const sanitized: Record<string, any> = {};
    if (body.title !== undefined) sanitized.title = body.title;
    if (body.slug !== undefined) sanitized.slug = body.slug;
    if (body.category !== undefined) sanitized.category = body.category;
    if (body.year !== undefined) sanitized.year = body.year;
    if (body.description !== undefined) sanitized.description = body.description;
    if (body.content !== undefined) sanitized.content = body.content;
    if (body.technologies !== undefined) sanitized.technologies = body.technologies;
    if (body.visuals !== undefined) sanitized.visuals = body.visuals;
    if (body.repo_link !== undefined || body.repoLink !== undefined) sanitized.repo_link = body.repo_link ?? body.repoLink ?? null;
    if (body.demo_link !== undefined || body.demoLink !== undefined) sanitized.demo_link = body.demo_link ?? body.demoLink ?? null;
    if (body.featured !== undefined) sanitized.featured = body.featured;

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from("projects").update(sanitized);
      query = isUUID ? query.eq("id", id) : query.eq("slug", id);
      const { data, error } = await query.select().single();

      if (!error && data) return NextResponse.json(data);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: sanitized });
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
    const isUUID = UUID_REGEX.test(id);

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from("projects").delete();
      query = isUUID ? query.eq("id", id) : query.eq("slug", id);
      const { error } = await query;

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
