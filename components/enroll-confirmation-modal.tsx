"use client"

import { useState } from "react"
import { Calendar, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  name: string
  credits: number
  schedule: string
  instructor: string
  availableSeats?: number
  totalSeats?: number
}

interface EnrollConfirmationModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function EnrollConfirmationModal({ course, isOpen, onClose, onConfirm }: EnrollConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onConfirm()
    }, 800)
  }

  if (!course) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#800000]">Confirm Enrollment</DialogTitle>
          <DialogDescription>
            You are about to enroll in the following course. Please review the details before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-lg p-4 my-4">
          <div className="flex items-start gap-3">
            <div className="bg-[#800000]/10 p-2 rounded-md">
              <Info className="h-5 w-5 text-[#800000]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-[#800000]">
                {course.id}: {course.name}
              </h3>
              <p className="text-sm text-gray-500">{course.instructor}</p>

              <div className="flex items-center gap-2 mt-3">
                <Badge className="bg-[#D4AF37]">{course.credits} Credits</Badge>
              </div>

              <div className="flex items-center mt-3 text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>{course.schedule}</span>
              </div>

              <div className="mt-4 pt-3 border-t text-sm text-gray-500">
                <p>
                  By enrolling, you agree to the course requirements and attendance policy. This course will be added to
                  your schedule immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            className="bg-[#800000] text-white hover:bg-[#600000]"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm Enrollment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
