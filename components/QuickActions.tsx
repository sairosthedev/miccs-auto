import { Card, CardContent } from "@/components/ui/card"
import { Plus, BarChart3, Users } from "lucide-react"

interface QuickActionsProps {
  onAddCar: () => void
  onViewReports: () => void
  onManageUsers: () => void
}

export function QuickActions({ onAddCar, onViewReports, onManageUsers }: QuickActionsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-colors cursor-pointer" onClick={onAddCar}>
        <CardContent className="p-6 text-center">
          <Plus className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Add New Car</h3>
          <p className="text-gray-400 text-sm">Add a new vehicle to your inventory</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800 hover:border-yellow-400 transition-colors cursor-pointer" onClick={onViewReports}>
        <CardContent className="p-6 text-center">
          <BarChart3 className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">View Reports</h3>
          <p className="text-gray-400 text-sm">Analyze sales and inventory reports</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800 hover:border-green-400 transition-colors cursor-pointer" onClick={onManageUsers}>
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Manage Users</h3>
          <p className="text-gray-400 text-sm">Manage customers and sales agents</p>
        </CardContent>
      </Card>
    </div>
  )
} 