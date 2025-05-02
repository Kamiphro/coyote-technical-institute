"use client"

import Link from "next/link"
import { Bell, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import AdminSidebar from "./admin-sidebar"
import { logout } from "@/actions/auth-actions"

interface AdminHeaderProps {
  adminData: {
    name: string
    id: string
    department: string
    notifications?: number
  }
}

export default function AdminHeader({ adminData }: AdminHeaderProps) {
  const handleLogout = async () => {
    await logout("admin")
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <AdminSidebar adminData={adminData} activePage="dashboard" />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-[#800000]">Coyote Technology Institute</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin-notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {adminData.notifications > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#800000] text-white"
                  variant="default"
                >
                  {adminData.notifications}
                </Badge>
              )}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{adminData.name}</p>
              <p className="text-xs text-gray-500">{adminData.department}</p>
            </div>
            <form action={handleLogout}>
              <Button type="submit" variant="outline" className="text-[#800000] border-[#800000]">
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
