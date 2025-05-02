import Link from "next/link"
import { Bell, BookOpen, ChevronRight, PlusCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getDashboardStats, getRecentNotifications, getPopularCourses } from "@/actions/admin-actions"
import AdminSidebar from "@/components/admin-sidebar"
import AdminHeader from "@/components/admin-header"

// This would come from authentication in a real app
const adminData = {
  name: "Dr. Sarah Johnson",
  id: "ADM2023001",
  department: "Computer Science",
}

export default async function AdminDashboard() {
  // Fetch data from MongoDB
  const stats = await getDashboardStats(adminData.department)
  const notifications = await getRecentNotifications(adminData.department)
  const popularCourses = await getPopularCourses(adminData.department)

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader adminData={{ ...adminData, notifications: unreadCount }} />

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar adminData={adminData} activePage="dashboard" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#800000]">Admin Dashboard</h2>
            <p className="text-gray-600">Welcome back, {adminData.name}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#800000]">{stats.activeCourses}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Waitlisted Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#D4AF37]">{stats.waitlistedStudents}</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Notifications and Popular Courses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Notifications */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-[#800000]">Recent Notifications</CardTitle>
                  <Link href="/admin-notifications">
                    <Button variant="ghost" size="sm" className="text-[#800000] h-8 px-2">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Recent student activity in your department</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[320px] overflow-y-auto">
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification._id.toString()} className="p-3 border rounded-lg bg-white">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {notification.type === "drop" && (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Dropped</Badge>
                              )}
                              {notification.type === "add" && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Added</Badge>
                              )}
                              {notification.type === "waitlist" && (
                                <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20">
                                  Waitlisted
                                </Badge>
                              )}
                              {notification.type === "withdraw" && (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Withdrew</Badge>
                              )}
                              <h3 className="font-medium">{notification.student_name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">ID: {notification.student_id}</p>
                            {notification.course_id && (
                              <p className="text-sm mt-1">
                                {notification.course_id}: {notification.course_name}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(notification.timestamp)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">No recent notifications</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Popular Courses */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-[#800000]">Course Status</CardTitle>
                  <Link href="/admin-courses">
                    <Button variant="ghost" size="sm" className="text-[#800000] h-8 px-2">
                      Manage Courses
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>Enrollment status for popular courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularCourses.length > 0 ? (
                    popularCourses.map((course) => (
                      <div key={course.id} className="p-3 border rounded-lg bg-white">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h3 className="font-medium">
                              {course.id}: {course.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-500">
                                {course.enrolled}/{course.capacity} enrolled
                              </span>
                              {course.waitlist > 0 && (
                                <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20">
                                  {course.waitlist} waitlisted
                                </Badge>
                              )}
                              {course.enrolled === course.capacity && (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Full</Badge>
                              )}
                            </div>
                          </div>
                          <Link href={`/admin-courses/${course.id}`} className="mt-2 sm:mt-0">
                            <Button variant="outline" size="sm" className="h-8">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">No courses found</div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Link href="/admin-courses/create" className="w-full">
                  <Button className="w-full bg-[#800000]">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Course
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg text-[#800000]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/admin-courses" className="w-full">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center">
                    <BookOpen className="h-6 w-6 mb-2 text-[#800000]" />
                    <span>Manage Courses</span>
                  </Button>
                </Link>
                <Link href="/admin-students" className="w-full">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-2 text-[#800000]" />
                    <span>Manage Students</span>
                  </Button>
                </Link>
                <Link href="/admin-notifications" className="w-full">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center">
                    <Bell className="h-6 w-6 mb-2 text-[#800000]" />
                    <span>View Notifications</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
