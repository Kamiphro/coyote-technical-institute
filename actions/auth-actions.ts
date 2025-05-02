"use server"

import { connectToDatabase } from "@/lib/mongodb"
import Student from "@/models/Student"
import Admin from "@/models/Admin"
import bcrypt from "bcryptjs"

export async function studentLogin(formData: FormData) {
  try {
    await connectToDatabase()

    const studentId = formData.get("studentId") as string
    const password = formData.get("password") as string

    if (!studentId || !password) {
      return { success: false, message: "Student ID and password are required" }
    }

    // Find the student by ID
    const student = await Student.findOne({ student_id: studentId })

    if (!student) {
      return { success: false, message: "Invalid student ID or password" }
    }

    // Check if the password is correct
    // For testing purposes, we'll allow both hashed and plain text passwords
    let isPasswordValid = false

    if (student.password.startsWith("$2a$") || student.password.startsWith("$2b$")) {
      // It's a hashed password, compare with bcrypt
      isPasswordValid = await bcrypt.compare(password, student.password)
    } else {
      // For testing, allow direct comparison (not secure for production)
      isPasswordValid = password === student.password
    }

    if (!isPasswordValid) {
      return { success: false, message: "Invalid student ID or password" }
    }

    // Login successful
    return {
      success: true,
      message: "Login successful",
      redirectTo: "/student-dashboard",
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        studentId: student.student_id,
        role: "student",
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function adminLogin(formData: FormData) {
  try {
    await connectToDatabase()

    const adminId = formData.get("adminId") as string
    const password = formData.get("password") as string

    if (!adminId || !password) {
      return { success: false, message: "Admin ID and password are required" }
    }

    // Find the admin by ID
    const admin = await Admin.findOne({ admin_id: adminId })

    if (!admin) {
      return { success: false, message: "Invalid admin ID or password" }
    }

    // Check if the password is correct
    // For testing purposes, we'll allow both hashed and plain text passwords
    let isPasswordValid = false

    if (admin.password.startsWith("$2a$") || admin.password.startsWith("$2b$")) {
      // It's a hashed password, compare with bcrypt
      isPasswordValid = await bcrypt.compare(password, admin.password)
    } else {
      // For testing, allow direct comparison (not secure for production)
      isPasswordValid = password === admin.password
    }

    if (!isPasswordValid) {
      return { success: false, message: "Invalid admin ID or password" }
    }

    // Login successful
    return {
      success: true,
      message: "Login successful",
      redirectTo: "/admin-dashboard",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        adminId: admin.admin_id,
        role: "admin",
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}
