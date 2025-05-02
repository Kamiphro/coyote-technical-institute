import Link from "next/link"
import { Bell, BookOpen, GraduationCap, LayoutDashboard, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AdminSidebarProps {
  adminData: {
    name: string
    department: string
    notifications?: number
  }
  activePage: string
}

export default function AdminSidebar({ adminData, activePage }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-65px)] sticky top-[65px] hidden md:block">
      <div className="p-4 border-b">
        <div className="font-medium">{adminData.name}</div>
        <div className="text-sm text-gray-500">{adminData.department} Department</div>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="/admin-dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activePage === "dashboard"
                  ? "bg-[#800000]/10 text-[#800000] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin-courses"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activePage === "courses"
                  ? "bg-[#800000]/10 text-[#800000] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Courses
            </Link>
          </li>
          <li>
            <Link
              href="/admin-students"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activePage === "students"
                  ? "bg-[#800000]/10 text-[#800000] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Users className="h-5 w-5" />
              Students
            </Link>
          </li>
          <li>
            <Link
              href="/admin-notifications"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activePage === "notifications"
                  ? "bg-[#800000]/10 text-[#800000] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Bell className="h-5 w-5" />
              Notifications
              {adminData.notifications && adminData.notifications > 0 && (
                <Badge className="ml-auto bg-[#D4AF37]">{adminData.notifications}</Badge>
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/admin-department"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activePage === "department"
                  ? "bg-[#800000]/10 text-[#800000] font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <GraduationCap className="h-5 w-5" />
              Department
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
