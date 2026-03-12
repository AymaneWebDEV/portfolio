import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const featured = searchParams.get("featured");

    let query: any = {};
    if (slug) query.slug = slug;
    if (featured === "true") query.featured = true;

    const projects = await Project.find(query).sort({ createdAt: -1 });

    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and Slug are required" }, { status: 400 });
    }

    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
