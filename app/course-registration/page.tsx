"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Filter, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const departments = [
  "All Departments",
  "Computer Science (CS)",
  "Information Technology (IT)",
  "Mathematics (MATH)",
  "English (ENG)",
  "Physics (PHYS)",
]

const availableCourses = [
  {
    id: "CS201",
    name: "Object-Oriented Programming",
    department: "Computer Science (CS)",
    credits: 4,
    schedule: "Mon/Wed 9:00-10:30 AM",
    instructor: "Dr. Johnson",
    availableSeats: 15,
    totalSeats: 30,
    description: "Introduction to object-oriented programming concepts using Java.",
    prerequisites: "CS101",
  },
  {
    id: "CS305",
    name: "Database Systems",
    department: "Computer Science (CS)",
    credits: 3,
    schedule: "Tue/Thu 11:00-12:30 PM",
    instructor: "Dr. Martinez",
    availableSeats: 8,
    totalSeats: 25,
    description: "Fundamentals of database design, SQL, and database management systems.",
    prerequisites: "CS201",
  },
  {
    id: "CS350",
    name: "Computer Networks",
    department: "Computer Science (CS)",
    credits: 3,
    schedule: "Mon/Wed/Fri 1:00-2:00 PM",
    instructor: "Dr. Wilson",
    availableSeats: 12,
    totalSeats: 30,
    description: "Introduction to computer networking concepts, protocols, and architectures.",
    prerequisites: "CS201",
  },
  {
    id: "CS401",
    name: "Artificial Intelligence",
    department: "Computer Science (CS)",
    credits: 4,
    schedule: "Tue/Thu 2:00-3:30 PM",
    instructor: "Dr. Lee",
    availableSeats: 5,
    totalSeats: 25,
    description: "Introduction to AI concepts, algorithms, and applications.",
    prerequisites: "CS305, MATH240",
  },
  {
    id: "IT310",
    name: "Cybersecurity Fundamentals",
    department: "Information Technology (IT)",
    credits: 3,
    schedule: "Mon/Wed 3:00-4:30 PM",
    instructor: "Prof. Anderson",
    availableSeats: 20,
    totalSeats: 35,
    description: "Introduction to cybersecurity principles and practices.",
    prerequisites: "IT201",
  },
  {
    id: "MATH240",
    name: "Discrete Mathematics",
    department: "Mathematics (MATH)",
    credits: 3,
    schedule: "Mon/Wed/Fri 2:00-3:00 PM",
    instructor: "Dr. Garcia",
    availableSeats: 18,
    totalSeats: 40,
    description: "Mathematical structures and techniques used in computer science.",
    prerequisites: "MATH101",
  },
]

export default function CourseRegistration() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const studentMajor = "Computer Science" // This would come from user context in a real app

  // Filter courses based on search term, department, and student's major
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "All Departments" || course.department === selectedDepartment

    // Only show courses in the student's major department
    const matchesMajor = course.department.includes(studentMajor)

    return matchesSearch && matchesDepartment && matchesMajor
  })

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId])
    }
  }

  const isEnrolled = (courseId: string) => enrolledCourses.includes(courseId)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/student-dashboard" className="text-[#800000] hover:text-[#600000] mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#800000]">Course Registration</h1>
          </div>
          <div>
            <Badge className="bg-[#D4AF37]">
              {enrolledCourses.length} Course{enrolledCourses.length !== 1 ? "s" : ""} Selected
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-[#800000]">Find Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by course name or code"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Showing courses for <span className="font-medium">{studentMajor}</span> major
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Course Listings */}
        <Tabs defaultValue="cards" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Courses</h2>
            <TabsList>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cards" className="mt-0">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="bg-[#800000]/10 px-4 py-2 border-b flex justify-between items-center">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-[#800000] mr-2" />
                        <span className="font-medium">{course.id}</span>
                      </div>
                      <Badge className="bg-[#D4AF37]">{course.credits} Credits</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <span className="text-sm">{course.schedule}</span>
                        </div>
                        <div className="flex items-start">
                          <Users className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <span className="text-sm">
                            {course.availableSeats} seats available (of {course.totalSeats})
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Instructor: <span className="font-medium">{course.instructor}</span>
                        </div>
                        {isEnrolled(course.id) ? (
                          <Button variant="outline" className="bg-green-50 text-green-600 border-green-200" disabled>
                            Enrolled
                          </Button>
                        ) : (
                          <Button
                            className="bg-[#800000]"
                            onClick={() => handleEnroll(course.id)}
                            disabled={course.availableSeats === 0}
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No courses found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="table" className="mt-0">
            {filteredCourses.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full bg-white">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Schedule</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Instructor</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Seats</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Credits</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="font-medium">{course.id}</div>
                          <div className="text-sm text-gray-500">{course.name}</div>
                        </td>
                        <td className="px-4 py-4 text-sm">{course.schedule}</td>
                        <td className="px-4 py-4 text-sm">{course.instructor}</td>
                        <td className="px-4 py-4 text-sm">
                          {course.availableSeats}/{course.totalSeats}
                        </td>
                        <td className="px-4 py-4">
                          <Badge className="bg-[#D4AF37]">{course.credits}</Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          {isEnrolled(course.id) ? (
                            <Button variant="outline" className="bg-green-50 text-green-600 border-green-200" disabled>
                              Enrolled
                            </Button>
                          ) : (
                            <Button
                              className="bg-[#800000]"
                              onClick={() => handleEnroll(course.id)}
                              disabled={course.availableSeats === 0}
                            >
                              Enroll
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium">No courses found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        {enrolledCourses.length > 0 && (
          <div className="mt-8 flex justify-end">
            <Link href="/student-dashboard">
              <Button className="bg-[#800000]">Complete Registration</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
