"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, RefreshCw } from "lucide-react"

export default function TestDbPage() {
  const [connectionStatus, setConnectionStatus] = useState<null | { success: boolean; message: string }>(null)
  const [seedStatus, setSeedStatus] = useState<null | { success: boolean; message: string; data?: any }>(null)
  const [loading, setLoading] = useState({ connection: false, seed: false })

  const testConnection = async () => {
    setLoading({ ...loading, connection: true })
    try {
      const res = await fetch("/api/test-connection")
      const data = await res.json()
      setConnectionStatus(data)
    } catch (error) {
      setConnectionStatus({ success: false, message: error.message })
    } finally {
      setLoading({ ...loading, connection: false })
    }
  }

  const seedDatabase = async () => {
    setLoading({ ...loading, seed: true })
    try {
      const res = await fetch("/api/seed")
      const data = await res.json()
      setSeedStatus(data)
    } catch (error) {
      setSeedStatus({ success: false, message: error.message })
    } finally {
      setLoading({ ...loading, seed: false })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">MongoDB Connection Test</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Connection Test
            </CardTitle>
            <CardDescription>Test the connection to your MongoDB database</CardDescription>
          </CardHeader>
          <CardContent>
            {connectionStatus && (
              <Alert className={connectionStatus.success ? "bg-green-50" : "bg-red-50"}>
                {connectionStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>{connectionStatus.success ? "Connection Successful" : "Connection Failed"}</AlertTitle>
                <AlertDescription>{connectionStatus.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={testConnection} disabled={loading.connection}>
              {loading.connection ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Seed Database
            </CardTitle>
            <CardDescription>Populate your database with sample data</CardDescription>
          </CardHeader>
          <CardContent>
            {seedStatus && (
              <Alert className={seedStatus.success ? "bg-green-50" : "bg-red-50"}>
                {seedStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>{seedStatus.success ? "Database Seeded Successfully" : "Seeding Failed"}</AlertTitle>
                <AlertDescription>
                  {seedStatus.message}
                  {seedStatus.success && seedStatus.data && (
                    <div className="mt-2">
                      <p>Created:</p>
                      <ul className="list-disc pl-5">
                        <li>{seedStatus.data.admins} admin(s)</li>
                        <li>{seedStatus.data.courses} course(s)</li>
                        <li>{seedStatus.data.students} student(s)</li>
                        <li>{seedStatus.data.notifications} notification(s)</li>
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={seedDatabase} disabled={loading.seed}>
              {loading.seed ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
