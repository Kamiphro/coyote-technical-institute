"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Calendar, LogOut, PenSquare, Search, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLoggedInStudent, logout } from "@/actions/auth-actions"

export default function StudentDashboard() {
  const router = useRouter()
  const [studentData, setStudentData] = useState(null)
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const student = await getLoggedInStudent()

        if (!student) {
          // Redirect to login if not logged in
          router.push("/student-login")
          return
        }

        setStudentData(student)
        setCourses(student.enrolled_courses || [])
      } catch (error) {
        console.error("Error fetching student data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudentData()
  }, [router])

  const handleDropCourse = (courseId) => {
    // In a real app, this would call a server action to drop the course
    setCourses(courses.filter((course) => course.id !== courseId))
  }

  const handleLogout = async () => {
    await logout("student")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (!studentData) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-[#800000]">Coyote Technology Institute</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-[#800000]">
              <User className="h-5 w-5 mr-2" />
              Profile
            </Button>
            <Link href="/withdraw">
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                <LogOut className="h-5 w-5 mr-2" />
                Withdraw
              </Button>
            </Link>
            <form action={handleLogout}>
              <Button type="submit" variant="outline" className="text-[#800000] border-[#800000]">
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-gradient-to-r from-[#800000]/90 to-[#800000]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome, {studentData.name}!</h2>
                <p className="text-white/80">Student ID: {studentData.student_id}</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
                <Link href="/course-registration">
                  <Button className="bg-white text-[#800000] hover:bg-gray-100">
                    <Search className="h-4 w-4 mr-2" />
                    Register for Courses
                  </Button>
                </Link>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                  <Link href="/change-major">
                    <PenSquare className="h-4 w-4 mr-2" />
                    Change Major
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Current Major</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#800000]">{studentData.major}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Credit Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#800000]">{studentData.credit_hours}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Current GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#D4AF37]">{studentData.gpa}</p>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#800000]">Currently Enrolled Courses</CardTitle>
            <CardDescription>
              {courses.length} courses | {courses.reduce((total, course) => total + course.credits, 0)} credit hours
              this semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg bg-white">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {course.id}: {course.name}
                          </h3>
                          <Badge className="bg-[#D4AF37]">{course.credits} Credits</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {course.schedule}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-3 md:mt-0 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDropCourse(course.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Drop Course
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No courses enrolled</h3>
                <p className="text-gray-500 mt-1">Register for courses to see them here</p>
                <Link href="/course-registration" className="mt-4 inline-block">
                  <Button className="bg-[#800000]">Browse Courses</Button>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 border-t">
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Registration deadline: <span className="font-medium">August 30, 2024</span>
              </p>
              <Link href="/course-registration">
                <Button className="bg-[#800000]">
                  <Search className="h-4 w-4 mr-2" />
                  Find More Courses
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
