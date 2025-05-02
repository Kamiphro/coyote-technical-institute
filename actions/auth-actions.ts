"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Student from "@/models/Student"
import Admin from "@/models/Admin"

// Student login - adapted to work with flexible schema
export async function studentLogin(formData: FormData) {
  await dbConnect()

  const studentId = formData.get("studentId") as string
  const password = formData.get("password") as string

  // Basic validation
  if (!studentId || !password) {
    return { success: false, message: "Student ID and password are required" }
  }

  try {
    // Find student by ID - we'll try common field names
    const student = await Student.findOne({
      $or: [{ student_id: studentId }, { studentId: studentId }, { id: studentId }, { _id: studentId }],
    })

    // Check if student exists
    if (!student) {
      return { success: false, message: "Invalid student ID or password" }
    }

    // Check password - try common field names
    const storedPassword = student.password || student.pwd || student.pass

    if (!storedPassword || storedPassword !== password) {
      return { success: false, message: "Invalid student ID or password" }
    }

    // Set a cookie to maintain the session
    cookies().set("studentId", studentId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Return success
    return { success: true, redirectTo: "/student-dashboard" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

// Admin login - adapted to work with flexible schema
export async function adminLogin(formData: FormData) {
  await dbConnect()

  const adminId = formData.get("adminId") as string
  const password = formData.get("password") as string

  // Basic validation
  if (!adminId || !password) {
    return { success: false, message: "Admin ID and password are required" }
  }

  try {
    // Find admin by ID - we'll try common field names
    const admin = await Admin.findOne({
      $or: [{ admin_id: adminId }, { adminId: adminId }, { id: adminId }, { _id: adminId }],
    })

    // Check if admin exists
    if (!admin) {
      return { success: false, message: "Invalid admin ID or password" }
    }

    // Check password - try common field names
    const storedPassword = admin.password || admin.pwd || admin.pass

    if (!storedPassword || storedPassword !== password) {
      return { success: false, message: "Invalid admin ID or password" }
    }

    // Set a cookie to maintain the session
    cookies().set("adminId", adminId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Return success
    return { success: true, redirectTo: "/admin-dashboard" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

// The rest of the file remains the same...
export async function getLoggedInStudent() {
  const studentId = cookies().get("studentId")?.value

  if (!studentId) {
    return null
  }

  await dbConnect()

  try {
    // Try to find student by various ID field names
    const student = await Student.findOne({
      $or: [{ student_id: studentId }, { studentId: studentId }, { id: studentId }, { _id: studentId }],
    })
    return student
  } catch (error) {
    console.error("Error getting logged in student:", error)
    return null
  }
}

export async function getLoggedInAdmin() {
  const adminId = cookies().get("adminId")?.value

  if (!adminId) {
    return null
  }

  await dbConnect()

  try {
    // Try to find admin by various ID field names
    const admin = await Admin.findOne({
      $or: [{ admin_id: adminId }, { adminId: adminId }, { id: adminId }, { _id: adminId }],
    })
    return admin
  } catch (error) {
    console.error("Error getting logged in admin:", error)
    return null
  }
}

export async function logout(type: "student" | "admin") {
  if (type === "student") {
    cookies().delete("studentId")
  } else {
    cookies().delete("adminId")
  }

  redirect("/")
}
