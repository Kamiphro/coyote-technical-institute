import Link from "next/link"
import { ArrowLeft, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdminHeaderProps {
  adminData: {
    name: string
    department: string
    notifications?: number
  }
  showBackButton?: boolean
  backUrl?: string
  backText?: string
}

export default function AdminHeader({
  adminData,
  showBackButton = false,
  backUrl = "/admin-dashboard",
  backText = "Back to Dashboard",
}: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-[#800000]">Coyote Technology Institute</h1>
          <Badge className="ml-4 bg-[#800000]">Admin Portal</Badge>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin-notifications">
            <Button variant="ghost" className="relative">
              <Bell className="h-5 w-5 text-[#800000]" />
              {adminData.notifications && adminData.notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-[#D4AF37] text-white">
                  {adminData.notifications}
                </Badge>
              )}
            </Button>
          </Link>
          {showBackButton ? (
            <Link href={backUrl}>
              <Button variant="outline" className="text-[#800000] border-[#800000]">
                <ArrowLeft className="h-5 w-5 mr-2" />
                {backText}
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="text-[#800000] border-[#800000]">
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
