import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Admin from "@/models/Admin"
import Course from "@/models/Course"
import Student from "@/models/Student"
import Notification from "@/models/Notification"

export async function GET() {
  try {
    await connectToDatabase()

    // Clear existing data
    await Admin.deleteMany({})
    await Course.deleteMany({})
    await Student.deleteMany({})
    await Notification.deleteMany({})

    // Create admin
    const admin = await Admin.create({
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@coyotetech.edu",
      department: "Computer Science",
      admin_id: "ADM2023001",
      password: "hashed_password_here", // In production, use proper hashing
    })

    // Create courses
    const courses = await Course.create([
      {
        course_id: "CS101",
        name: "Introduction to Programming",
        schedule: "Mon/Wed 10:00-11:30 AM",
        instructor: "Dr. Smith",
        department: "Computer Science",
        credits: 3,
        capacity: 30,
        enrolled: 30,
        waitlist: 5,
        status: "active",
        description: "An introduction to programming concepts using Python.",
      },
      {
        course_id: "CS210",
        name: "Data Structures",
        schedule: "Tue/Thu 1:00-2:30 PM",
        instructor: "Dr. Chen",
        department: "Computer Science",
        credits: 4,
        capacity: 30,
        enrolled: 28,
        waitlist: 0,
        status: "active",
        description: "Study of data structures and algorithms.",
      },
      {
        course_id: "CS305",
        name: "Database Systems",
        schedule: "Tue/Thu 11:00-12:30 PM",
        instructor: "Dr. Martinez",
        department: "Computer Science",
        credits: 3,
        capacity: 25,
        enrolled: 25,
        waitlist: 8,
        status: "active",
        description: "Introduction to database design and SQL.",
      },
      {
        course_id: "CS401",
        name: "Artificial Intelligence",
        schedule: "Tue/Thu 2:00-3:30 PM",
        instructor: "Dr. Lee",
        department: "Computer Science",
        credits: 4,
        capacity: 25,
        enrolled: 23,
        waitlist: 0,
        status: "active",
        description: "Fundamentals of AI and machine learning.",
      },
    ])

    // Create students
    const students = await Student.create([
      {
        name: "John Doe",
        email: "john.doe@coyotetech.edu",
        student_id: "STU20230001",
        major: "Computer Science",
        credits_completed: 45,
        gpa: 3.7,
        enrolled_courses: ["CS101", "CS305"],
        waitlisted_courses: [],
        status: "active",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@coyotetech.edu",
        student_id: "STU20230002",
        major: "Computer Science",
        credits_completed: 60,
        gpa: 3.9,
        enrolled_courses: ["CS101", "CS210"],
        waitlisted_courses: ["CS305"],
        status: "active",
      },
      {
        name: "Alex Johnson",
        email: "alex.johnson@coyotetech.edu",
        student_id: "STU20230003",
        major: "Data Science",
        credits_completed: 30,
        gpa: 3.5,
        enrolled_courses: ["CS101"],
        waitlisted_courses: ["CS305"],
        status: "active",
      },
    ])

    // Create notifications
    const notifications = await Notification.create([
      {
        title: "Course Enrollment",
        message: "John Doe has enrolled in CS101",
        type: "enrollment",
        read: false,
        timestamp: new Date(),
        related_student: "STU20230001",
        related_course: "CS101",
      },
      {
        title: "Waitlist Addition",
        message: "Jane Smith has been added to the waitlist for CS305",
        type: "waitlist",
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        related_student: "STU20230002",
        related_course: "CS305",
      },
      {
        title: "Course Drop",
        message: "Alex Johnson has dropped CS210",
        type: "drop",
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        related_student: "STU20230003",
        related_course: "CS210",
      },
      {
        title: "Waitlist Addition",
        message: "Alex Johnson has been added to the waitlist for CS305",
        type: "waitlist",
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        related_student: "STU20230003",
        related_course: "CS305",
      },
      {
        title: "Course Full",
        message: "CS305 has reached maximum capacity",
        type: "system",
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 90), // 90 minutes ago
        related_course: "CS305",
      },
    ])

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: {
        admins: 1,
        courses: courses.length,
        students: students.length,
        notifications: notifications.length,
      },
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { success: false, message: "Failed to seed database", error: error.message },
      { status: 500 },
    )
  }
}
