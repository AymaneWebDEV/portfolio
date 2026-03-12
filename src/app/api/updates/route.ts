import connectToDatabase from "@/lib/db";
import Update from "@/models/Update";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const updates = await Update.find({}).sort({ createdAt: -1 });
    return NextResponse.json(updates);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 });
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

    if (!body.title || !body.content) {
      return NextResponse.json({ error: "Title and Content are required" }, { status: 400 });
    }

    const update = await Update.create(body);
    return NextResponse.json(update, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create update" }, { status: 500 });
  }
}
