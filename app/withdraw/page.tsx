"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  term: "Fall 2024",
  enrolledCourses: [
    { id: "CS101", name: "Introduction to Programming", credits: 3 },
    { id: "CS210", name: "Data Structures", credits: 4 },
    { id: "MATH240", name: "Discrete Mathematics", credits: 3 },
    { id: "ENG101", name: "Technical Writing", credits: 3 },
  ],
}

export default function Withdraw() {
  const [reason, setReason] = useState("")
  const [acknowledgements, setAcknowledgements] = useState({
    financial: false,
    grades: false,
    return: false,
  })
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const allAcknowledged = Object.values(acknowledgements).every(Boolean)
  const totalCredits = studentData.enrolledCourses.reduce((sum, course) => sum + course.credits, 0)

  const handleWithdraw = () => {
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
          <h1 className="text-xl font-bold text-[#800000]">Withdraw from University</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-600 font-medium">Important Notice</AlertTitle>
          <AlertDescription className="text-gray-700">
            Withdrawing from the university is a serious decision that will affect your academic record, financial aid,
            and future enrollment. Please read all information carefully before proceeding.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-[#800000]">Current Enrollment Information</CardTitle>
            <CardDescription>You are currently enrolled in the following courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Course</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {studentData.enrolledCourses.map((course) => (
                    <tr key={course.id} className="bg-white">
                      <td className="px-4 py-3 text-sm font-medium">{course.id}</td>
                      <td className="px-4 py-3 text-sm">{course.name}</td>
                      <td className="px-4 py-3 text-sm text-right">{course.credits}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium" colSpan={2}>
                      Total Credits
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-right">{totalCredits}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#800000]">Withdrawal Request</CardTitle>
            <CardDescription>
              Please provide a reason for your withdrawal and acknowledge the following statements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Withdrawal</Label>
              <Textarea
                id="reason"
                placeholder="Please explain why you are withdrawing from the university"
                className="min-h-[100px]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">Please acknowledge the following:</h3>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="financial"
                  checked={acknowledgements.financial}
                  onCheckedChange={(checked) =>
                    setAcknowledgements({ ...acknowledgements, financial: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="financial" className="font-normal leading-snug text-sm">
                    I understand that withdrawing may affect my financial aid, scholarships, and tuition refunds. I may
                    be required to repay a portion of my financial aid.
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="grades"
                  checked={acknowledgements.grades}
                  onCheckedChange={(checked) =>
                    setAcknowledgements({ ...acknowledgements, grades: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="grades" className="font-normal leading-snug text-sm">
                    I understand that withdrawing after the drop deadline will result in "W" grades on my transcript for
                    all courses this term.
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="return"
                  checked={acknowledgements.return}
                  onCheckedChange={(checked) =>
                    setAcknowledgements({ ...acknowledgements, return: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="return" className="font-normal leading-snug text-sm">
                    I understand that if I wish to return to Coyote Technology Institute in the future, I will need to
                    reapply for admission.
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={!reason || !allAcknowledged}
            >
              Request Withdrawal
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Confirm Withdrawal
            </DialogTitle>
            <DialogDescription>
              You are about to withdraw from all courses at Coyote Technology Institute for the {studentData.term} term.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <h3 className="font-medium text-red-800">Important Consequences</h3>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-4 text-gray-700">
                <li>You will receive "W" grades for all courses this term</li>
                <li>You may be responsible for repaying a portion of your financial aid</li>
                <li>Your student status will be changed to "Withdrawn"</li>
                <li>You will need to reapply for admission if you wish to return</li>
              </ul>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Are you absolutely sure you want to withdraw from Coyote Technology Institute? This action cannot be
                reversed.
              </p>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleWithdraw}>
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600 flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Withdrawal Request Submitted
            </DialogTitle>
            <DialogDescription>Your withdrawal request has been submitted successfully.</DialogDescription>
          </DialogHeader>

          <div className="bg-green-50 border border-green-100 rounded-lg p-4 my-4">
            <p className="text-sm">
              Your request to withdraw from Coyote Technology Institute for the {studentData.term} term has been
              submitted. A confirmation email has been sent to your student email address.
            </p>
            <p className="text-sm mt-3">
              Please check your student email for further instructions. You will be contacted by the Registrar's Office
              within 2-3 business days to complete the withdrawal process.
            </p>
          </div>

          <DialogFooter>
            <Link href="/" className="w-full">
              <Button className="bg-[#800000] text-white hover:bg-[#600000] w-full">Return to Home</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
