import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Experience from "@/models/Experience";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Fetch experiences error:", error);
    return NextResponse.json({ error: "Failed to fetch experiences." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    await connectDB();
    const experience = await Experience.create(body);
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Create experience error:", error);
    return NextResponse.json({ error: "Failed to create experience." }, { status: 500 });
  }
}
