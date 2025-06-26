import { Card, CardContent } from "@/components/ui/card"
import React from "react"

export interface Stat {
  icon: React.ElementType
  label: string
  value: string
  change: string
  color: string
}

interface StatsGridProps {
  stats: Stat[]
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat, index) => (
      <Card key={index} className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className={`text-xs ${stat.color} mt-1`}>{stat.change}</p>
            </div>
            <div className={`p-3 rounded-full bg-gray-800`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

export default StatsGrid; 