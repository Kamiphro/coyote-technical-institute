"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCourse } from "@/actions/admin-actions"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"

// This would come from authentication in a real app
const adminData = {
  name: "Dr. Sarah Johnson",
  id: "ADM2023001",
  department: "Computer Science",
  notifications: 5,
}

export default function CreateCourse() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    courseId: "",
    name: "",
    department: "Computer Science",
    instructor: "",
    description: "",
    credits: "",
    capacity: "",
    schedule: "",
    timeSlot: "",
    prerequisites: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      const result = await createCourse(formDataObj)

      if (result.success) {
        router.push("/admin-courses")
      }
    } catch (error) {
      console.error("Error creating course:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader adminData={adminData} showBackButton={true} backUrl="/admin-courses" backText="Back to Courses" />

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar adminData={adminData} activePage="courses" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#800000]">Create New Course</h2>
            <p className="text-gray-600">Add a new course to the {adminData.department} department</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-[#800000]">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseId">Course ID</Label>
                    <Input
                      id="courseId"
                      placeholder="e.g., CS101"
                      value={formData.courseId}
                      onChange={(e) => handleChange("courseId", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Introduction to Programming"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      placeholder="e.g., Dr. Smith"
                      value={formData.instructor}
                      onChange={(e) => handleChange("instructor", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter course description"
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credit Hours</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="1"
                      max="6"
                      placeholder="e.g., 3"
                      value={formData.credits}
                      onChange={(e) => handleChange("credits", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Maximum Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      placeholder="e.g., 30"
                      value={formData.capacity}
                      onChange={(e) => handleChange("capacity", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-[#800000]">Schedule Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule Days</Label>
                    <Select value={formData.schedule} onValueChange={(value) => handleChange("schedule", value)}>
                      <SelectTrigger id="schedule">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mon/Wed">Monday/Wednesday</SelectItem>
                        <SelectItem value="Tue/Thu">Tuesday/Thursday</SelectItem>
                        <SelectItem value="Mon/Wed/Fri">Monday/Wednesday/Friday</SelectItem>
                        <SelectItem value="Fri">Friday only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeSlot">Time Slot</Label>
                    <Select value={formData.timeSlot} onValueChange={(value) => handleChange("timeSlot", value)}>
                      <SelectTrigger id="timeSlot">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8:00-9:30 AM">8:00-9:30 AM</SelectItem>
                        <SelectItem value="9:00-10:30 AM">9:00-10:30 AM</SelectItem>
                        <SelectItem value="10:00-11:30 AM">10:00-11:30 AM</SelectItem>
                        <SelectItem value="11:00-12:30 PM">11:00-12:30 PM</SelectItem>
                        <SelectItem value="1:00-2:30 PM">1:00-2:30 PM</SelectItem>
                        <SelectItem value="2:00-3:30 PM">2:00-3:30 PM</SelectItem>
                        <SelectItem value="3:00-4:30 PM">3:00-4:30 PM</SelectItem>
                        <SelectItem value="4:00-5:30 PM">4:00-5:30 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites (Optional)</Label>
                  <Input
                    id="prerequisites"
                    placeholder="e.g., CS101, MATH240"
                    value={formData.prerequisites}
                    onChange={(e) => handleChange("prerequisites", e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Comma-separated list of course IDs</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Link href="/admin-courses">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" className="bg-[#800000]" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Course"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </main>
      </div>
    </div>
  )
}
