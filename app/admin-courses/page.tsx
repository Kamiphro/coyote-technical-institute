"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import CourseList from "@/components/course-list"

// Mock data for demonstration
const adminData = {
  name: "Dr. Sarah Johnson",
  id: "ADM2023001",
  department: "Computer Science",
  notifications: 5,
}

const courses = [
  {
    id: "CS101",
    name: "Introduction to Programming",
    schedule: "Mon/Wed 10:00-11:30 AM",
    instructor: "Dr. Smith",
    enrolled: 30,
    capacity: 30,
    waitlist: 5,
    status: "active",
  },
  {
    id: "CS210",
    name: "Data Structures",
    schedule: "Tue/Thu 1:00-2:30 PM",
    instructor: "Dr. Chen",
    enrolled: 28,
    capacity: 30,
    waitlist: 0,
    status: "active",
  },
  {
    id: "CS305",
    name: "Database Systems",
    schedule: "Tue/Thu 11:00-12:30 PM",
    instructor: "Dr. Martinez",
    enrolled: 25,
    capacity: 25,
    waitlist: 8,
    status: "active",
  },
  {
    id: "CS350",
    name: "Computer Networks",
    schedule: "Mon/Wed/Fri 1:00-2:00 PM",
    instructor: "Dr. Wilson",
    enrolled: 22,
    capacity: 30,
    waitlist: 0,
    status: "active",
  },
  {
    id: "CS401",
    name: "Artificial Intelligence",
    schedule: "Tue/Thu 2:00-3:30 PM",
    instructor: "Dr. Lee",
    enrolled: 23,
    capacity: 25,
    waitlist: 0,
    status: "active",
  },
  {
    id: "CS450",
    name: "Operating Systems",
    schedule: "Mon/Wed 3:00-4:30 PM",
    instructor: "Dr. Johnson",
    enrolled: 20,
    capacity: 25,
    waitlist: 0,
    status: "active",
  },
  {
    id: "CS480",
    name: "Software Engineering",
    schedule: "Tue/Thu 9:00-10:30 AM",
    instructor: "Dr. Brown",
    enrolled: 18,
    capacity: 25,
    waitlist: 0,
    status: "active",
  },
  {
    id: "CS490",
    name: "Senior Project",
    schedule: "Fri 1:00-4:00 PM",
    instructor: "Dr. Davis",
    enrolled: 15,
    capacity: 20,
    waitlist: 0,
    status: "active",
  },
]

export default function AdminCourses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("cards")

  // Filter courses based on search term and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || course.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader
        adminData={adminData}
        showBackButton={true}
        backUrl="/admin-dashboard"
        backText="Back to Dashboard"
      />

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar adminData={adminData} activePage="courses" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#800000]">Course Management</h2>
            <p className="text-gray-600">Manage courses for {adminData.department} department</p>
          </div>

          <div className="flex justify-end mb-6">
            <Link href="/admin-courses/create">
              <Button className="bg-[#800000]">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </Link>
          </div>

          <Suspense fallback={<div>Loading courses...</div>}>
            <CourseList initialCourses={courses} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
