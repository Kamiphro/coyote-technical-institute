"use client"

import { AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CreditWarningModalProps {
  isOpen: boolean
  onClose: () => void
  currentCredits: number
}

export function CreditWarningModal({ isOpen, onClose, currentCredits }: CreditWarningModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#D4AF37] flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Credit Hour Warning
          </DialogTitle>
          <DialogDescription>
            Your total credit hours have fallen below the minimum required for full-time status.
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
                You are currently enrolled in <span className="font-semibold">{currentCredits} credit hours</span>,
                which is below the 12 credit hour minimum for full-time status.
              </p>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-4">
                <li>This may affect your financial aid eligibility</li>
                <li>Scholarships may be reduced or revoked</li>
                <li>Housing eligibility may be affected</li>
                <li>Graduation timeline may be extended</li>
              </ul>
              <p className="text-sm mt-3">
                Please visit the Academic Advising office or contact your advisor as soon as possible to discuss your
                options.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="bg-[#800000] text-white hover:bg-[#600000] w-full" onClick={onClose}>
            Okay, I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
