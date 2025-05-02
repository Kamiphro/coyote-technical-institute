"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for demonstration
const studentData = {
  name: "Alex Johnson",
  id: "CTI2023456",
  major: "Computer Science",
  creditHours: 42,
  gpa: 3.75,
}

const availableMajors = [
  {
    id: "CS",
    name: "Computer Science",
    description: "Study of algorithms, programming languages, and computation",
    requirements: "Minimum GPA: 3.0, Prerequisite: CS101, MATH240",
  },
  {
    id: "IT",
    name: "Information Technology",
    description: "Focus on computing infrastructure, networks, and systems administration",
    requirements: "Minimum GPA: 2.5, Prerequisite: IT101",
  },
  {
    id: "SE",
    name: "Software Engineering",
    description: "Application of engineering principles to software development",
    requirements: "Minimum GPA: 3.0, Prerequisite: CS101, SE200",
  },
  {
    id: "DS",
    name: "Data Science",
    description: "Analysis and interpretation of complex data",
    requirements: "Minimum GPA: 3.2, Prerequisite: MATH240, STAT200",
  },
  {
    id: "CYB",
    name: "Cybersecurity",
    description: "Protection of computer systems, networks, and data",
    requirements: "Minimum GPA: 3.0, Prerequisite: CS101, NET200",
  },
  {
    id: "AI",
    name: "Artificial Intelligence",
    description: "Development of intelligent machines and software",
    requirements: "Minimum GPA: 3.5, Prerequisite: CS101, MATH240, AI200",
  },
  {
    id: "GD",
    name: "Game Development",
    description: "Design and programming of video games",
    requirements: "Minimum GPA: 2.8, Prerequisite: CS101, ART150",
  },
  {
    id: "BIS",
    name: "Business Information Systems",
    description: "Application of technology in business contexts",
    requirements: "Minimum GPA: 2.7, Prerequisite: BUS101, IT101",
  },
]

export default function ChangeMajor() {
  const [selectedMajor, setSelectedMajor] = useState(studentData.major)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const currentMajorDetails = availableMajors.find((major) => major.name === studentData.major)
  const selectedMajorDetails = availableMajors.find((major) => major.name === selectedMajor)
  const isSameMajor = selectedMajor === studentData.major

  const handleChangeMajor = () => {
    setIsConfirmModalOpen(false)
    // In a real application, this would send a request to the server
    setTimeout(() => {
      setIsSuccessModalOpen(true)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/student-dashboard" className="text-[#800000] hover:text-[#600000] mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#800000]">Change Major</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-[#800000]">Current Academic Information</CardTitle>
            <CardDescription>Review your current academic status before changing your major</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Current Major</div>
                <div className="text-lg font-semibold text-[#800000]">{studentData.major}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Total Credit Hours</div>
                <div className="text-lg font-semibold">{studentData.creditHours}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Current GPA</div>
                <div className="text-lg font-semibold text-[#D4AF37]">{studentData.gpa}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#800000]">Select New Major</CardTitle>
            <CardDescription>Choose from the available majors at Coyote Technology Institute</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">New Major</label>
              <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a major" />
                </SelectTrigger>
                <SelectContent>
                  {availableMajors.map((major) => (
                    <SelectItem key={major.id} value={major.name}>
                      {major.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMajorDetails && !isSameMajor && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-[#800000]">{selectedMajorDetails.name}</h3>
                  <p className="text-sm mt-1">{selectedMajorDetails.description}</p>
                  <div className="mt-3 pt-3 border-t">
                    <h4 className="text-sm font-medium">Requirements</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedMajorDetails.requirements}</p>
                  </div>
                </div>

                <Alert className="bg-[#800000]/10 border-[#800000]/20">
                  <Info className="h-4 w-4 text-[#800000]" />
                  <AlertDescription className="text-gray-700">
                    <p className="font-medium">How this change may affect you:</p>
                    <ul className="text-sm mt-2 space-y-1 list-disc pl-4">
                      <li>Some of your completed courses may not count toward your new major</li>
                      <li>You may need to take additional prerequisite courses</li>
                      <li>Your expected graduation date may change</li>
                      <li>You will be assigned a new academic advisor</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {isSameMajor && (
              <Alert className="bg-gray-100 border-gray-200">
                <Info className="h-4 w-4 text-gray-500" />
                <AlertDescription className="text-gray-700">
                  You are currently enrolled in this major. Please select a different major to make a change.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              className="bg-[#800000] text-white hover:bg-[#600000]"
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isSameMajor || !selectedMajorDetails}
            >
              Request Major Change
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* Confirmation Modal */}
      {selectedMajorDetails && (
        <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#800000]">Confirm Major Change</DialogTitle>
              <DialogDescription>
                Please review the following information before confirming your major change request.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Current Major:</div>
                <div className="font-medium">{studentData.major}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">New Major:</div>
                <div className="font-medium text-[#800000]">{selectedMajor}</div>
              </div>
              <div className="pt-3 border-t text-sm text-gray-500">
                <p>
                  Your major change request will be reviewed by the academic department. You will be notified once your
                  request has been processed.
                </p>
              </div>
            </div>

            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#800000] text-white hover:bg-[#600000]" onClick={handleChangeMajor}>
                Confirm Change
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600 flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Request Submitted
            </DialogTitle>
            <DialogDescription>Your major change request has been submitted successfully.</DialogDescription>
          </DialogHeader>

          <div className="bg-green-50 border border-green-100 rounded-lg p-4 my-4">
            <p className="text-sm">
              Your request to change your major from <span className="font-medium">{studentData.major}</span> to{" "}
              <span className="font-medium text-[#800000]">{selectedMajor}</span> has been submitted for review.
            </p>
            <p className="text-sm mt-3">
              Please check your student email for updates. The review process typically takes 3-5 business days.
            </p>
          </div>

          <DialogFooter>
            <Link href="/student-dashboard" className="w-full">
              <Button className="bg-[#800000] text-white hover:bg-[#600000] w-full">Return to Dashboard</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
