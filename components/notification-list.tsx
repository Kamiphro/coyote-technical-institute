"use client"

import { useState } from "react"
import { BookOpen, Check, Filter, MoreHorizontal, Search, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "@/actions/admin-actions"

interface Notification {
  _id: string
  type: string
  student_id: string
  student_name: string
  course_id?: string
  course_name?: string
  message: string
  read: boolean
  timestamp: string
}

interface NotificationListProps {
  initialNotifications: Notification[]
}

export default function NotificationList({ initialNotifications }: NotificationListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [readFilter, setReadFilter] = useState("all")
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  // Filter notifications based on search term, type, and read status
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notification.course_id && notification.course_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (notification.course_name && notification.course_name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesRead =
      readFilter === "all" ||
      (readFilter === "read" && notification.read) ||
      (readFilter === "unread" && !notification.read)

    return matchesSearch && matchesType && matchesRead
  })

  // Mark notification as read
  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id)
      setNotifications(
        notifications.map((notification) => (notification._id === id ? { ...notification, read: true } : notification)),
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead("Computer Science") // This would come from context in a real app
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  // Delete notification
  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id)
      setNotifications(notifications.filter((notification) => notification._id !== id))
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }

  return (
    <>
      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications by student, course, or ID"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="add">Course Adds</SelectItem>
                  <SelectItem value="drop">Course Drops</SelectItem>
                  <SelectItem value="waitlist">Waitlist</SelectItem>
                  <SelectItem value="withdraw">Withdrawals</SelectItem>
                </SelectContent>
              </Select>
              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredNotifications.length}</span> notifications
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification._id}
              className={`${notification.read ? "bg-white" : "bg-[#800000]/5 border-l-4 border-l-[#800000]"}`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {notification.type === "drop" && (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Dropped</Badge>
                      )}
                      {notification.type === "add" && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Added</Badge>
                      )}
                      {notification.type === "waitlist" && (
                        <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20">Waitlisted</Badge>
                      )}
                      {notification.type === "withdraw" && (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Withdrew</Badge>
                      )}
                      <h3 className="font-medium">{notification.student_name}</h3>
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-[#D4AF37]"></span>}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">ID: {notification.student_id}</p>
                    {notification.course_id && (
                      <p className="text-sm mt-1">
                        {notification.course_id}: {notification.course_name}
                      </p>
                    )}
                    {notification.type === "withdraw" && <p className="text-sm mt-1">Withdrew from the institution</p>}
                    <p className="text-xs text-gray-500 mt-2">{formatDate(notification.timestamp)}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => handleMarkAsRead(notification._id)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDeleteNotification(notification._id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        {notification.type !== "withdraw" && (
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            View Student
                          </DropdownMenuItem>
                        )}
                        {notification.course_id && (
                          <DropdownMenuItem>
                            <BookOpen className="h-4 w-4 mr-2" />
                            View Course
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="h-12 w-12 mx-auto text-gray-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
