"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, RefreshCw } from "lucide-react"

export default function TestDbConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<null | { success: boolean; message: string; schemas?: any }>(
    null,
  )
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/inspect-schema")
      const data = await res.json()
      setConnectionStatus(data)
    } catch (error) {
      setConnectionStatus({ success: false, message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">MongoDB Connection Test</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Connection to Existing Database
          </CardTitle>
          <CardDescription>
            Test the connection to your MongoDB database at cse4550finalproject.pvorjk9.mongodb.net
          </CardDescription>
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

          {connectionStatus && connectionStatus.success && connectionStatus.schemas && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Database Collections</h3>
              <div className="space-y-4">
                {Object.entries(connectionStatus.schemas).map(([collection, fields]) => (
                  <div key={collection} className="border rounded-md p-4">
                    <h4 className="font-medium text-[#800000]">{collection}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {Array.isArray(fields) ? `Fields: ${fields.join(", ")}` : "Could not retrieve fields"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={testConnection} disabled={loading}>
            {loading ? (
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
    </div>
  )
}
