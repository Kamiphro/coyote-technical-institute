"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { adminLogin } from "@/actions/auth-actions"

export default function AdminLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await adminLogin(formData)

      if (result.success) {
        router.push(result.redirectTo || "/admin-dashboard")
      } else {
        setError(result.message || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

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

        {error && (
          <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form action={handleSubmit} className="mt-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="adminId">Admin ID</Label>
            <Input id="adminId" name="adminId" placeholder="Enter your admin ID" className="border-gray-300" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="border-gray-300"
              required
            />
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-[#800000] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-[#800000] py-6 text-white hover:bg-[#600000]" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          For administrative access only. If you're a student, please use the Student Portal.
        </div>
      </div>
    </div>
  )
}
