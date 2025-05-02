"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Register() {
  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    major: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, major: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the registration data to the server
    console.log("Form submitted:", formData)
  }

  const majors = [
    "Computer Science",
    "Information Technology",
    "Cybersecurity",
    "Data Science",
    "Software Engineering",
    "Artificial Intelligence",
    "Network Engineering",
    "Business Information Systems",
    "Digital Media",
    "Undecided",
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-[#800000] hover:text-[#600000]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-[#800000]">Create Account</h1>
          <p className="mt-2 text-gray-600">Join Coyote Technology Institute</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              placeholder="Enter your assigned student ID"
              className="border-gray-300"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              className="border-gray-300"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="border-gray-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="border-gray-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long with a mix of letters, numbers, and symbols.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="border-gray-300"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="major">Intended Major</Label>
            <Select onValueChange={handleSelectChange} value={formData.major}>
              <SelectTrigger id="major" className="w-full border-gray-300">
                <SelectValue placeholder="Select your intended major" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((major) => (
                  <SelectItem key={major} value={major}>
                    {major}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full bg-[#800000] py-6 text-white hover:bg-[#600000]">
              Create Account
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/student-login" className="text-[#800000] hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
