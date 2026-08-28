import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { projects as fallbackProjects } from "@/lib/data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const featured = searchParams.get("featured");

    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
        if (slug) query = query.eq("slug", slug);
        if (featured === "true") query = query.eq("featured", true);

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return NextResponse.json(data);
        }
      } catch (sbErr) {
        console.warn("Supabase fetch failed, serving fallback data.", sbErr);
      }
    }

    // Filter fallback projects if params exist
    let result = fallbackProjects;
    if (slug) {
      result = result.filter((p) => p.slug === slug);
    }
    if (featured === "true") {
      result = result.filter((p) => p.featured);
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(fallbackProjects);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and Slug are required" }, { status: 400 });
    }

    const sanitized: Record<string, any> = {
      title: body.title,
      slug: body.slug,
      category: body.category || "Full Stack",
      year: body.year || new Date().getFullYear().toString(),
      description: body.description || "",
      content: body.content || "",
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      visuals: Array.isArray(body.visuals) ? body.visuals : [],
      repo_link: body.repo_link ?? body.repoLink ?? null,
      demo_link: body.demo_link ?? body.demoLink ?? null,
      featured: !!body.featured,
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("projects").insert([sanitized]).select().single();
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data, { status: 201 });
    }

    return NextResponse.json({ message: "Mock project created", project: sanitized }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
