"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Download, Filter, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Course {
  id: string
  name: string
  schedule: string
  instructor: string
  enrolled: number
  capacity: number
  waitlist: number
  status: string
}

interface CourseListProps {
  initialCourses: Course[]
}

export default function CourseList({ initialCourses }: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("cards")
  const [courses] = useState<Course[]>(initialCourses)

  // Filter courses based on search term and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "full" && course.enrolled === course.capacity) ||
      (statusFilter === "active" && course.status === "active") ||
      (statusFilter === "inactive" && course.status === "inactive")

    return matchesSearch && matchesStatus
  })

  return (
    <>
      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses by ID, name, or instructor"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="active">Active Courses</SelectItem>
                  <SelectItem value="inactive">Inactive Courses</SelectItem>
                  <SelectItem value="full">Full Courses</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle and Course Listings */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredCourses.length}</span> courses
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
        </div>

        {/* Course Listings */}
        <TabsContent value="cards" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{course.id}</h3>
                      <p className="text-sm text-gray-500">{course.name}</p>
                    </div>
                    {course.enrolled === course.capacity ? (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Full</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
                    )}
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Instructor:</span>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Schedule:</span>
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Enrollment:</span>
                      <span>
                        {course.enrolled}/{course.capacity}
                      </span>
                    </div>
                    {course.waitlist > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Waitlist:</span>
                        <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20">
                          {course.waitlist} students
                        </Badge>
                      </div>
                    )}
                    <div className="pt-4 flex justify-end gap-2">
                      <Link href={`/admin-courses/${course.id}/students`}>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Students
                        </Button>
                      </Link>
                      <Link href={`/admin-courses/${course.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full bg-white">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Course ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Course Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Instructor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Schedule</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Enrollment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium">{course.id}</td>
                    <td className="px-4 py-4">{course.name}</td>
                    <td className="px-4 py-4">{course.instructor}</td>
                    <td className="px-4 py-4">{course.schedule}</td>
                    <td className="px-4 py-4">
                      {course.enrolled}/{course.capacity}
                      {course.waitlist > 0 && (
                        <Badge className="ml-2 bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20">
                          +{course.waitlist}
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {course.enrolled === course.capacity ? (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Full</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin-courses/${course.id}/students`}>
                          <Button variant="outline" size="sm">
                            Students
                          </Button>
                        </Link>
                        <Link href={`/admin-courses/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
