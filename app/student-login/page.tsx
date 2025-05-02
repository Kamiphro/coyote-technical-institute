import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function StudentLogin() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-[#800000] hover:text-[#600000]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-[#800000]">Student Login</h1>
          <p className="mt-2 text-gray-600">Access your student portal</p>
        </div>

        <div className="mt-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="student-id">Student ID</Label>
            <Input id="student-id" placeholder="Enter your student ID" className="border-gray-300" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" className="border-gray-300" />
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-[#800000] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button className="w-full bg-[#800000] py-6 text-white hover:bg-[#600000]">Login</Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">New student? </span>
            <Link href="/register" className="text-[#800000] hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
