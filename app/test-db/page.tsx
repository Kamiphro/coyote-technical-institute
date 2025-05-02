"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, RefreshCw } from "lucide-react"

export default function TestDbPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [seedStatus, setSeedStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [seedMessage, setSeedMessage] = useState<string>("")

  const testConnection = async () => {
    setStatus("loading")
    try {
      const res = await fetch("/api/test-connection")
      const data = await res.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to connect to database")
      }
    } catch (error) {
      setStatus("error")
      setMessage(error.message || "An error occurred")
    }
  }

  const seedDatabase = async () => {
    setSeedStatus("loading")
    try {
      const res = await fetch("/api/seed")
      const data = await res.json()

      if (data.success) {
        setSeedStatus("success")
        setSeedMessage(
          `Database seeded successfully with ${data.data.courses} courses, ${data.data.students} students, and ${data.data.notifications} notifications`,
        )
      } else {
        setSeedStatus("error")
        setSeedMessage(data.message || "Failed to seed database")
      }
    } catch (error) {
      setSeedStatus("error")
      setSeedMessage(error.message || "An error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#800000] mb-8">Database Connection Test</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              MongoDB Connection Test
            </CardTitle>
            <CardDescription>Test the connection to your MongoDB database</CardDescription>
          </CardHeader>
          <CardContent>
            {status === "success" && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Connection Successful</AlertTitle>
                <AlertDescription className="text-green-700">{message}</AlertDescription>
              </Alert>
            )}

            {status === "error" && (
              <Alert className="bg-red-50 border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Connection Failed</AlertTitle>
                <AlertDescription className="text-red-700">{message}</AlertDescription>
              </Alert>
            )}

            {status === "idle" && (
              <p className="text-gray-600">Click the button below to test your MongoDB connection.</p>
            )}

            {status === "loading" && (
              <div className="flex items-center text-gray-600">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Testing connection...
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={testConnection} disabled={status === "loading"} className="bg-[#800000]">
              {status === "loading" ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seed Database</CardTitle>
            <CardDescription>Populate your database with sample data for testing</CardDescription>
          </CardHeader>
          <CardContent>
            {seedStatus === "success" && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Database Seeded</AlertTitle>
                <AlertDescription className="text-green-700">{seedMessage}</AlertDescription>
              </Alert>
            )}

            {seedStatus === "error" && (
              <Alert className="bg-red-50 border-red-200">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Seeding Failed</AlertTitle>
                <AlertDescription className="text-red-700">{seedMessage}</AlertDescription>
              </Alert>
            )}

            {seedStatus === "idle" && (
              <p className="text-gray-600">
                This will clear any existing data and create sample courses, students, and notifications.
              </p>
            )}

            {seedStatus === "loading" && (
              <div className="flex items-center text-gray-600">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Seeding database...
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={seedDatabase} disabled={seedStatus === "loading"} className="bg-[#800000]">
              {seedStatus === "loading" ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Seeding...
                </>
              ) : (
                "Seed Database"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
