"use server"

import { revalidatePath } from "next/cache"
import dbConnect from "@/lib/mongodb"
import Course from "@/models/Course"
import Student from "@/models/Student"
import Notification from "@/models/Notification"

// Admin Dashboard Stats
export async function getDashboardStats(department: string) {
  await dbConnect()

  const totalCourses = await Course.countDocuments({ department })
  const activeCourses = await Course.countDocuments({ department, status: "active" })
  const totalStudents = await Student.countDocuments({ major: department })

  // Count students in waitlists for courses in this department
  const courses = await Course.find({ department })
  let waitlistedStudents = 0
  courses.forEach((course) => {
    waitlistedStudents += course.waitlist.length
  })

  return {
    totalCourses,
    activeCourses,
    totalStudents,
    waitlistedStudents,
  }
}

// Get recent notifications
export async function getRecentNotifications(department: string, limit = 5) {
  await dbConnect()

  // Get course IDs for this department
  const courses = await Course.find({ department }, "course_id")
  const courseIds = courses.map((course) => course.course_id)

  // Get notifications for these courses or for students in this department
  const notifications = await Notification.find({
    $or: [
      { course_id: { $in: courseIds } },
      { type: "withdraw", student_id: { $in: await Student.find({ major: department }, "student_id") } },
    ],
  })
    .sort({ timestamp: -1 })
    .limit(limit)

  return notifications
}

// Get popular courses
export async function getPopularCourses(department: string, limit = 4) {
  await dbConnect()

  const courses = await Course.find({ department, status: "active" })
    .sort({ "enrolled_students.length": -1 })
    .limit(limit)

  return courses.map((course) => ({
    id: course.course_id,
    name: course.name,
    enrolled: course.enrolled_students.length,
    capacity: course.max_size,
    waitlist: course.waitlist.length,
  }))
}

// Get all courses
export async function getAllCourses(department: string) {
  await dbConnect()

  const courses = await Course.find({ department })

  return courses.map((course) => ({
    id: course.course_id,
    name: course.name,
    schedule: `${course.schedule} ${course.time_slot}`,
    instructor: course.instructor,
    enrolled: course.enrolled_students.length,
    capacity: course.max_size,
    waitlist: course.waitlist.length,
    status: course.status,
  }))
}

// Get all students
export async function getAllStudents(department: string) {
  await dbConnect()

  const students = await Student.find({ major: department })

  return students.map((student) => ({
    id: student.student_id,
    name: student.name,
    email: student.email,
    major: student.major,
    creditHours: student.credit_hours,
    gpa: student.gpa,
    status: student.status,
  }))
}

// Get all notifications
export async function getAllNotifications(department: string) {
  await dbConnect()

  // Get course IDs for this department
  const courses = await Course.find({ department }, "course_id")
  const courseIds = courses.map((course) => course.course_id)

  // Get notifications for these courses or for students in this department
  const notifications = await Notification.find({
    $or: [
      { course_id: { $in: courseIds } },
      { type: "withdraw", student_id: { $in: await Student.find({ major: department }, "student_id") } },
    ],
  }).sort({ timestamp: -1 })

  return notifications
}

// Create a new course
export async function createCourse(formData: FormData) {
  await dbConnect()

  const courseId = formData.get("courseId") as string
  const name = formData.get("name") as string
  const department = formData.get("department") as string
  const instructor = formData.get("instructor") as string
  const description = formData.get("description") as string
  const credits = Number.parseInt(formData.get("credits") as string)
  const capacity = Number.parseInt(formData.get("capacity") as string)
  const schedule = formData.get("schedule") as string
  const timeSlot = formData.get("timeSlot") as string
  const prerequisites = (formData.get("prerequisites") as string)
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  const course = new Course({
    course_id: courseId,
    name,
    department,
    instructor,
    description,
    credits,
    max_size: capacity,
    schedule,
    time_slot: timeSlot,
    prerequisites,
    enrolled_students: [],
    waitlist: [],
    status: "active",
  })

  await course.save()

  revalidatePath("/admin-courses")
  revalidatePath("/admin-dashboard")

  return { success: true, course }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string) {
  await dbConnect()

  await Notification.findByIdAndUpdate(notificationId, { read: true })

  revalidatePath("/admin-notifications")
  revalidatePath("/admin-dashboard")

  return { success: true }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(department: string) {
  await dbConnect()

  // Get course IDs for this department
  const courses = await Course.find({ department }, "course_id")
  const courseIds = courses.map((course) => course.course_id)

  // Update notifications for these courses or for students in this department
  await Notification.updateMany(
    {
      $or: [
        { course_id: { $in: courseIds } },
        { type: "withdraw", student_id: { $in: await Student.find({ major: department }, "student_id") } },
      ],
    },
    { read: true },
  )

  revalidatePath("/admin-notifications")
  revalidatePath("/admin-dashboard")

  return { success: true }
}

// Delete notification
export async function deleteNotification(notificationId: string) {
  await dbConnect()

  await Notification.findByIdAndDelete(notificationId)

  revalidatePath("/admin-notifications")
  revalidatePath("/admin-dashboard")

  return { success: true }
}
