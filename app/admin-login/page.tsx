import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-[#800000] hover:text-[#600000]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-[#800000]">Admin Login</h1>
          <p className="mt-2 text-gray-600">Access administrative controls</p>
        </div>

        <div className="mt-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="admin-id">Admin ID</Label>
            <Input id="admin-id" placeholder="Enter your admin ID" className="border-gray-300" />
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
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          For administrative access only. If you're a student, please use the Student Portal.
        </div>
      </div>
    </div>
  )
}
