import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";

export async function GET() {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    
    // Send a minimal ping command to keep the cluster active
    if (db.connection.db) {
      await db.connection.db.command({ ping: 1 });
    }

    return NextResponse.json(
      { status: "success", message: "Database pinged successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ping error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to ping database" },
      { status: 500 }
    );
  }
}
