import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { client } = await connectToDatabase()

    // Test the connection by running a simple command
    await client.db().command({ ping: 1 })

    return NextResponse.json({
      success: true,
      message: "Successfully connected to MongoDB",
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to connect to MongoDB", error: error.message },
      { status: 500 },
    )
  }
}
