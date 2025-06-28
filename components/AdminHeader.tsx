import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Settings, LogOut } from "lucide-react"

interface AdminHeaderProps {
  onSettings: () => void
  onLogout: () => void
}

export function AdminHeader({ onSettings, onLogout }: AdminHeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/miccs-auto-logo.png" alt="Miccs Auto Logo" width={100} height={50} className="h-10 w-auto" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400">Manage your car inventory and sales</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={onSettings}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 