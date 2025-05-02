"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bell,
  BookOpen,
  ChevronDown,
  Download,
  Filter,
  GraduationCap,
  LayoutDashboard,
  Search,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const adminData = {
  name: "Dr. Sarah Johnson",
  id: "ADM2023001",
  department: "Computer Science",
  notifications: 5,
}

const students = [
  {
    id: "CTI2023456",
    name: "Alex Johnson",
    email: "alex.johnson@cti.edu",
    major: "Computer Science",
    creditHours: 42,
    gpa: 3.75,
    status: "active",
  },
  {
    id: "CTI2023789",
    name: "Emma Davis",
    email: "emma.davis@cti.edu",
    major: "Computer Science",
    creditHours: 36,
    gpa: 3.9,
    status: "active",
  },
  {
    id: "CTI2023234",
    name: "Michael Brown",
    email: "michael.brown@cti.edu",
    major: "Computer Science",
    creditHours: 45,
    gpa: 3.2,
    status: "active",
  },
  {
    id: "CTI2023567",
    name: "Sophia Martinez",
    email: "sophia.martinez@cti.edu",
    major: "Computer Science",
    creditHours: 39,
    gpa: 3.6,
    status: "active",
  },
  {
    id: "CTI2023890",
    name: "William Taylor",
    email: "william.taylor@cti.edu",
    major: "Computer Science",
    creditHours: 33,
    gpa: 3.4,
    status: "active",
  },
  {
    id: "CTI2023123",
    name: "Olivia Wilson",
    email: "olivia.wilson@cti.edu",
    major: "Computer Science",
    creditHours: 48,
    gpa: 3.8,
    status: "active",
  },
  {
    id: "CTI2023456",
    name: "James Anderson",
    email: "james.anderson@cti.edu",
    major: "Computer Science",
    creditHours: 30,
    gpa: 3.1,
    status: "active",
  },
  {
    id: "CTI2023789",
    name: "Ava Thomas",
    email: "ava.thomas@cti.edu",
    major: "Computer Science",
    creditHours: 42,
    gpa: 3.7,
    status: "active",
  },
]

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [majorFilter, setMajorFilter] = useState("all")
  const [viewMode, setViewMode] = useState("table")

  // Filter students based on search term and major
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMajor = majorFilter === "all" || student.major === majorFilter

    return matchesSearch && matchesMajor
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-[#800000]">Coyote Technology Institute</h1>
            <Badge className="ml-4 bg-[#800000]">Admin Portal</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin-notifications">
              <Button variant="ghost" className="relative">
                <Bell className="h-5 w-5 text-[#800000]" />
                {adminData.notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-[#D4AF37] text-white">
                    {adminData.notifications}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="outline" className="text-[#800000] border-[#800000]">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-65px)] sticky top-[65px] hidden md:block">
          <div className="p-4 border-b">
            <div className="font-medium">{adminData.name}</div>
            <div className="text-sm text-gray-500">{adminData.department} Department</div>
          </div>
          <nav className="p-2">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin-dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin-courses"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <BookOpen className="h-5 w-5" />
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/admin-students"
                  className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#800000]/10 text-[#800000] font-medium"
                >
                  <Users className="h-5 w-5" />
                  Students
                </Link>
              </li>
              <li>
                <Link
                  href="/admin-notifications"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                  {adminData.notifications > 0 && (
                    <Badge className="ml-auto bg-[#D4AF37]">{adminData.notifications}</Badge>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin-department"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <GraduationCap className="h-5 w-5" />
                  Department
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#800000]">Student Management</h2>
            <p className="text-gray-600">Manage students in {adminData.department} department</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students by ID, name, or email"
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={majorFilter} onValueChange={setMajorFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by major" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Majors</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
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

          {/* View Toggle and Student Listings */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredStudents.length}</span> students
            </div>
          </div>

          <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
              </TabsList>
            </div>

            {/* Student Listings */}
            <TabsContent value="table" className="mt-0">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full bg-white">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Student ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Major</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Credits</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">GPA</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium">{student.id}</td>
                        <td className="px-4 py-4">{student.name}</td>
                        <td className="px-4 py-4">{student.email}</td>
                        <td className="px-4 py-4">{student.major}</td>
                        <td className="px-4 py-4">{student.creditHours}</td>
                        <td className="px-4 py-4">
                          <span className="font-medium text-[#D4AF37]">{student.gpa}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin-students/${student.id}/courses`}>
                              <Button variant="outline" size="sm">
                                Courses
                              </Button>
                            </Link>
                            <Link href={`/admin-students/${student.id}`}>
                              <Button variant="outline" size="sm">
                                View
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

            <TabsContent value="cards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <Card key={student.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                      <p className="text-sm text-gray-500">{student.id}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Email:</span>
                          <span>{student.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Major:</span>
                          <span>{student.major}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Credit Hours:</span>
                          <span>{student.creditHours}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">GPA:</span>
                          <span className="font-medium text-[#D4AF37]">{student.gpa}</span>
                        </div>
                        <div className="pt-4 flex justify-end gap-2">
                          <Link href={`/admin-students/${student.id}/courses`}>
                            <Button variant="outline" size="sm">
                              Courses
                            </Button>
                          </Link>
                          <Link href={`/admin-students/${student.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
