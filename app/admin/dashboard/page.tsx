"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Car,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Settings,
  BarChart3,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    { icon: Car, label: "Total Cars", value: "156", change: "+12 this month", color: "text-blue-400" },
    { icon: DollarSign, label: "Total Sales", value: "$2.4M", change: "+18% from last month", color: "text-green-400" },
    { icon: Users, label: "Active Customers", value: "1,247", change: "+5% this week", color: "text-purple-400" },
    { icon: TrendingUp, label: "Monthly Revenue", value: "$340K", change: "+22% increase", color: "text-yellow-400" },
  ]

  const recentCars = [
    {
      id: 1,
      make: "BMW",
      model: "M4 Competition",
      year: 2023,
      price: 75000,
      status: "Available",
      image: "/placeholder.svg?height=100&width=150",
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      make: "Mercedes-Benz",
      model: "AMG GT",
      year: 2022,
      price: 68000,
      status: "Sold",
      image: "/placeholder.svg?height=100&width=150",
      addedDate: "2024-01-14",
    },
    {
      id: 3,
      make: "Audi",
      model: "RS6 Avant",
      year: 2023,
      price: 85000,
      status: "Available",
      image: "/placeholder.svg?height=100&width=150",
      addedDate: "2024-01-13",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Admin!</h2>
          <p className="text-gray-400">Here's what's happening with your car dealership today.</p>
        </div>

        {/* Stats Grid */}
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800 hover:border-red-600 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Plus className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Add New Car</h3>
              <p className="text-gray-400 text-sm">Add a new vehicle to your inventory</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-yellow-400 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">View Reports</h3>
              <p className="text-gray-400 text-sm">Analyze sales and inventory reports</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-green-400 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Manage Users</h3>
              <p className="text-gray-400 text-sm">Manage customers and sales agents</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Cars */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Recent Cars</CardTitle>
                <CardDescription className="text-gray-400">Recently added vehicles to your inventory</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCars.map((car) => (
                <div key={car.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={`${car.make} ${car.model}`}
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {car.year} {car.make} {car.model}
                      </h4>
                      <p className="text-sm text-gray-400">Added on {car.addedDate}</p>
                      <p className="text-lg font-bold text-yellow-400">${car.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={car.status === "Available" ? "default" : "secondary"}
                      className={car.status === "Available" ? "bg-green-600" : "bg-red-600"}
                    >
                      {car.status}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
