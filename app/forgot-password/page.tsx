"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send a request to the server
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-[#800000] hover:text-[#600000]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-[#800000]">Reset Password</h1>
          <p className="mt-2 text-gray-600">Enter your email to receive a password reset link</p>
        </div>

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#800000] py-6 text-white hover:bg-[#600000]">
              Send Reset Link
            </Button>

            <div className="text-center text-sm">
              <Link href="/student-login" className="text-[#800000] hover:underline">
                Return to login
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <Alert className="border-[#D4AF37] bg-[#D4AF37]/10">
              <AlertDescription className="text-center py-4">
                If an account exists with the email <span className="font-semibold">{email}</span>, a password reset
                link has been sent. Please check your inbox and follow the instructions.
              </AlertDescription>
            </Alert>

            <div className="text-center">
              <Link href="/student-login">
                <Button variant="outline" className="border-[#800000] text-[#800000] hover:bg-[#800000]/10">
                  Return to Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
