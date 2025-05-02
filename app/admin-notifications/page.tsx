import { Suspense } from "react"
import { getAllNotifications } from "@/actions/admin-actions"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import NotificationList from "@/components/notification-list"

// This would come from authentication in a real app
const adminData = {
  name: "Dr. Sarah Johnson",
  id: "ADM2023001",
  department: "Computer Science",
}

export default async function AdminNotifications() {
  // Fetch notifications from MongoDB
  const notifications = await getAllNotifications(adminData.department)

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader
        adminData={{ ...adminData, notifications: unreadCount }}
        showBackButton={true}
        backUrl="/admin-dashboard"
        backText="Back to Dashboard"
      />

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar adminData={{ ...adminData, notifications: unreadCount }} activePage="notifications" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#800000]">Notifications</h2>
            <p className="text-gray-600">Manage notifications for {adminData.department} department</p>
          </div>

          <Suspense fallback={<div>Loading notifications...</div>}>
            <NotificationList initialNotifications={notifications} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
