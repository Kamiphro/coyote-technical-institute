"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Info, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for demonstration
const studentData = {
  name: "Alex Johnson",
  id: "CTI2023456",
  major: "Computer Science",
  creditHours: 42,
  enrolledCourses: [
    {
      id: "CS101",
      name: "Introduction to Programming",
      credits: 3,
      schedule: "Mon/Wed 10:00-11:30 AM",
      instructor: "Dr. Smith",
    },
    { id: "CS210", name: "Data Structures", credits: 4, schedule: "Tue/Thu 1:00-2:30 PM", instructor: "Dr. Chen" },
    {
      id: "MATH240",
      name: "Discrete Mathematics",
      credits: 3,
      schedule: "Mon/Wed/Fri 2:00-3:00 PM",
      instructor: "Dr. Garcia",
    },
    {
      id: "ENG101",
      name: "Technical Writing",
      credits: 3,
      schedule: "Tue/Thu 9:00-10:30 AM",
      instructor: "Prof. Williams",
    },
  ],
}

interface Course {
  id: string
  name: string
  credits: number
  schedule: string
  instructor: string
}

export default function DropClasses() {
  const [courses, setCourses] = useState<Course[]>(studentData.enrolledCourses)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDropModalOpen, setIsDropModalOpen] = useState(false)
  const [isCreditWarningOpen, setIsCreditWarningOpen] = useState(false)
  const [currentCredits, setCurrentCredits] = useState(
    studentData.enrolledCourses.reduce((total, course) => total + course.credits, 0),
  )

  const handleOpenDropModal = (course: Course) => {
    setSelectedCourse(course)

    // Check if dropping this course would bring credits below 12
    const creditsAfterDrop = currentCredits - course.credits
    if (creditsAfterDrop < 12) {
      setIsDropModalOpen(false)
      setIsCreditWarningOpen(true)
    } else {
      setIsDropModalOpen(true)
      setIsCreditWarningOpen(false)
    }
  }

  const handleDropCourse = () => {
    if (selectedCourse) {
      const newCourses = courses.filter((course) => course.id !== selectedCourse.id)
      setCourses(newCourses)
      setCurrentCredits(currentCredits - selectedCourse.credits)
      setIsDropModalOpen(false)
    }
  }

  const handleContinueDrop = () => {
    setIsCreditWarningOpen(false)
    setIsDropModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/student-dashboard" className="text-[#800000] hover:text-[#600000] mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#800000]">Drop Classes</h1>
          </div>
          <div>
            <Badge className="bg-[#D4AF37]">{currentCredits} Credit Hours</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-[#800000]">Currently Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 mb-4">
              <p>
                <span className="font-medium">Note:</span> Dropping a course may affect your full-time status, financial
                aid, and graduation timeline. Full-time students must maintain at least 12 credit hours.
              </p>
            </div>

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
                        onClick={() => handleOpenDropModal(course)}
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
        </Card>

        {currentCredits < 12 && courses.length > 0 && (
          <Alert className="border-[#D4AF37] bg-[#D4AF37]/10">
            <AlertTriangle className="h-4 w-4 text-[#D4AF37]" />
            <AlertTitle className="text-[#800000] font-medium">Warning: Below Full-Time Status</AlertTitle>
            <AlertDescription className="text-gray-700">
              You are currently enrolled in {currentCredits} credit hours, which is below the 12 credit hour minimum for
              full-time status. This may affect your financial aid and other benefits.
            </AlertDescription>
          </Alert>
        )}
      </main>

      {/* Drop Confirmation Modal */}
      {selectedCourse && (
        <Dialog open={isDropModalOpen} onOpenChange={setIsDropModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#800000]">Confirm Drop Course</DialogTitle>
              <DialogDescription>
                You are about to drop the following course. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="border rounded-lg p-4 my-4">
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {selectedCourse.id}: {selectedCourse.name}
                </h3>
                <p className="text-sm text-gray-500">{selectedCourse.instructor}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#D4AF37]">{selectedCourse.credits} Credits</Badge>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedCourse.schedule}
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                After dropping this course, you will have {currentCredits - selectedCourse.credits} credit hours
                remaining.
              </p>
            </div>

            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline" onClick={() => setIsDropModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleDropCourse}>
                Drop Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Credit Warning Modal */}
      {selectedCourse && (
        <Dialog open={isCreditWarningOpen} onOpenChange={setIsCreditWarningOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#D4AF37] flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Credit Hour Warning
              </DialogTitle>
              <DialogDescription>
                Dropping this course will bring you below the minimum credit hours required for full-time status.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg p-4 my-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#D4AF37]/20 p-2 rounded-md">
                  <Info className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-medium">Important Information</h3>
                  <p className="text-sm mt-1">
                    Dropping {selectedCourse.id} will reduce your total credit hours to{" "}
                    {currentCredits - selectedCourse.credits}, which is below the 12 credit hour minimum for full-time
                    status.
                  </p>
                  <ul className="text-sm mt-2 space-y-1 list-disc pl-4">
                    <li>This may affect your financial aid eligibility</li>
                    <li>Scholarships may be reduced or revoked</li>
                    <li>Housing eligibility may be affected</li>
                    <li>Graduation timeline may be extended</li>
                  </ul>
                </div>
              </div>
            </div>

            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline" onClick={() => setIsCreditWarningOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#800000] text-white hover:bg-[#600000]" onClick={handleContinueDrop}>
                Continue Anyway
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
