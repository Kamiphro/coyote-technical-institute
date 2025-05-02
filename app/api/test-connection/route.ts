import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"

export async function GET() {
  try {
    await dbConnect()
    return NextResponse.json({ success: true, message: "Connected to MongoDB" })
  } catch (error) {
    console.error("MongoDB connection error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to connect to MongoDB", error: String(error) },
      { status: 500 },
    )
  }
}
