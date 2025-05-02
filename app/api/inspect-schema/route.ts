import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import mongoose from "mongoose"

export async function GET() {
  try {
    await dbConnect()

    // Collections to inspect
    const collections = ["students", "admins", "courses", "notifications", "registration_systems", "class_verification"]

    const schemas = {}

    // Get a sample document from each collection to inspect its structure
    for (const collection of collections) {
      try {
        const sampleDoc = await mongoose.connection.db.collection(collection).findOne({})
        schemas[collection] = sampleDoc ? Object.keys(sampleDoc) : []
      } catch (error) {
        schemas[collection] = { error: `Failed to inspect: ${error.message}` }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database schema inspection complete",
      schemas,
    })
  } catch (error) {
    console.error("MongoDB connection error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to connect to MongoDB", error: String(error) },
      { status: 500 },
    )
  }
}
