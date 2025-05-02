import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Admin from "@/models/Admin"
import Course from "@/models/Course"
import Student from "@/models/Student"
import Notification from "@/models/Notification"

export async function GET() {
  try {
    await dbConnect()

    // Clear existing data
    await Admin.deleteMany({})
    await Course.deleteMany({})
    await Student.deleteMany({})
    await Notification.deleteMany({})

    // Create admin
    const admin = new Admin({
      admin_id: "ADM2023001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@coyotetech.edu",
      department: "Computer Science",
      role: "Department Chair",
      password: "admin123", // In a real app, this would be hashed
    })
    await admin.save()

    // Create courses
    const courses = [
      {
        course_id: "CS101",
        name: "Introduction to Programming",
        department: "Computer Science",
        instructor: "Dr. Smith",
        description: "An introduction to programming concepts and techniques.",
        credits: 3,
        max_size: 30,
        schedule: "Mon/Wed",
        time_slot: "10:00-11:30 AM",
        prerequisites: [],
        enrolled_students: [],
        waitlist: [],
        status: "active",
      },
      {
        course_id: "CS210",
        name: "Data Structures",
        department: "Computer Science",
        instructor: "Dr. Chen",
        description: "A study of data structures and their applications.",
        credits: 4,
        max_size: 25,
        schedule: "Tue/Thu",
        time_slot: "1:00-2:30 PM",
        prerequisites: ["CS101"],
        enrolled_students: [],
        waitlist: [],
        status: "active",
      },
      {
        course_id: "CS310",
        name: "Algorithms",
        department: "Computer Science",
        instructor: "Dr. Patel",
        description: "Design and analysis of algorithms.",
        credits: 3,
        max_size: 25,
        schedule: "Mon/Wed/Fri",
        time_slot: "2:00-3:00 PM",
        prerequisites: ["CS210"],
        enrolled_students: [],
        waitlist: [],
        status: "active",
      },
      {
        course_id: "CS450",
        name: "Operating Systems",
        department: "Computer Science",
        instructor: "Dr. Garcia",
        description: "Principles of operating systems.",
        credits: 4,
        max_size: 20,
        schedule: "Tue/Thu",
        time_slot: "3:00-4:30 PM",
        prerequisites: ["CS210", "CS310"],
        enrolled_students: [],
        waitlist: [],
        status: "active",
      },
    ]

    await Course.insertMany(courses)

    // Create students
    const students = [
      {
        student_id: "CTI2023456",
        name: "Alex Johnson",
        email: "alex.johnson@coyotetech.edu",
        major: "Computer Science",
        credit_hours: 42,
        gpa: 3.75,
        status: "active",
        enrolled_courses: [
          {
            id: "CS101",
            name: "Introduction to Programming",
            credits: 3,
            schedule: "Mon/Wed 10:00-11:30 AM",
            instructor: "Dr. Smith",
          },
          {
            id: "CS210",
            name: "Data Structures",
            credits: 4,
            schedule: "Tue/Thu 1:00-2:30 PM",
            instructor: "Dr. Chen",
          },
        ],
        password: "student123", // In a real app, this would be hashed
      },
      {
        student_id: "CTI2023789",
        name: "Jamie Smith",
        email: "jamie.smith@coyotetech.edu",
        major: "Computer Science",
        credit_hours: 36,
        gpa: 3.5,
        status: "active",
        enrolled_courses: [
          {
            id: "CS101",
            name: "Introduction to Programming",
            credits: 3,
            schedule: "Mon/Wed 10:00-11:30 AM",
            instructor: "Dr. Smith",
          },
        ],
        password: "student123", // In a real app, this would be hashed
      },
      {
        student_id: "CTI2023123",
        name: "Taylor Lee",
        email: "taylor.lee@coyotetech.edu",
        major: "Computer Science",
        credit_hours: 24,
        gpa: 3.2,
        status: "active",
        enrolled_courses: [],
        password: "student123", // In a real app, this would be hashed
      },
    ]

    await Student.insertMany(students)

    // Update course enrollments
    await Course.findOneAndUpdate(
      { course_id: "CS101" },
      { $push: { enrolled_students: { $each: ["CTI2023456", "CTI2023789"] } } },
    )
    await Course.findOneAndUpdate({ course_id: "CS210" }, { $push: { enrolled_students: "CTI2023456" } })

    // Create notifications
    const notifications = [
      {
        type: "add",
        student_id: "CTI2023456",
        student_name: "Alex Johnson",
        course_id: "CS101",
        course_name: "Introduction to Programming",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: true,
      },
      {
        type: "add",
        student_id: "CTI2023456",
        student_name: "Alex Johnson",
        course_id: "CS210",
        course_name: "Data Structures",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: false,
      },
      {
        type: "add",
        student_id: "CTI2023789",
        student_name: "Jamie Smith",
        course_id: "CS101",
        course_name: "Introduction to Programming",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        read: false,
      },
    ]

    await Notification.insertMany(notifications)

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
      { success: false, message: "Error seeding database", error: error.message },
      { status: 500 },
    )
  }
}
