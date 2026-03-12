import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Experience from "@/models/Experience";
import { getSession } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const experience = await Experience.findByIdAndUpdate(id, body, { new: true });
    if (!experience) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(experience);
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
    await connectDB();

    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete experience error:", error);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
