"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Phone,
  Mail,
  Eye,
  LogOut,
  Settings,
  MessageSquare,
  Target,
} from "lucide-react"
import StatsGrid from "@/components/StatsGrid"
import LeadsList from "@/components/LeadsList"
import SalesList from "@/components/SalesList"
import InventoryList from "@/components/InventoryList"

export default function AgentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // Get user info from localStorage (demo purposes)
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}

  const stats = [
    { icon: Target, label: "My Sales This Month", value: "12", change: "+3 from last month", color: "text-green-400" },
    {
      icon: DollarSign,
      label: "Commission Earned",
      value: "$8,400",
      change: "+15% increase",
      color: "text-yellow-400",
    },
    { icon: Users, label: "Active Leads", value: "23", change: "+5 new this week", color: "text-blue-400" },
    { icon: TrendingUp, label: "Conversion Rate", value: "68%", change: "+12% improvement", color: "text-purple-400" },
  ]

  const leads = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      interestedCar: "2023 BMW M4 Competition",
      status: "Hot Lead",
      lastContact: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@gmail.com",
      phone: "+1 (555) 987-6543",
      interestedCar: "2022 Mercedes-Benz AMG GT",
      status: "Follow Up",
      lastContact: "1 day ago",
      priority: "medium",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@yahoo.com",
      phone: "+1 (555) 456-7890",
      interestedCar: "2023 Audi RS6 Avant",
      status: "New Lead",
      lastContact: "3 hours ago",
      priority: "high",
    },
  ]

  const recentSales = [
    {
      id: 1,
      customer: "John Smith",
      car: "2023 BMW X5",
      salePrice: 65000,
      commission: 1950,
      date: "2024-01-15",
      status: "Completed",
    },
    {
      id: 2,
      customer: "Lisa Wang",
      car: "2022 Mercedes C-Class",
      salePrice: 45000,
      commission: 1350,
      date: "2024-01-12",
      status: "Pending Delivery",
    },
    {
      id: 3,
      customer: "David Brown",
      car: "2023 Audi A4",
      salePrice: 42000,
      commission: 1260,
      date: "2024-01-10",
      status: "Completed",
    },
  ]

  const availableCars = [
    {
      id: 1,
      make: "BMW",
      model: "M4 Competition",
      year: 2023,
      price: 75000,
      image: "/placeholder.svg?height=100&width=150",
      status: "Available",
      inquiries: 5,
    },
    {
      id: 2,
      make: "Mercedes-Benz",
      model: "AMG GT",
      year: 2022,
      price: 68000,
      image: "/placeholder.svg?height=100&width=150",
      status: "Available",
      inquiries: 3,
    },
    {
      id: 3,
      make: "Audi",
      model: "RS6 Avant",
      year: 2023,
      price: 85000,
      image: "/placeholder.svg?height=100&width=150",
      status: "Available",
      inquiries: 7,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot Lead":
        return "bg-red-600"
      case "Follow Up":
        return "bg-yellow-600"
      case "New Lead":
        return "bg-blue-600"
      case "Completed":
        return "bg-green-600"
      case "Pending Delivery":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/miccs-auto-logo.png" alt="Miccs Auto Logo" width={100} height={50} className="h-10 w-auto" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white">Sales Agent Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {user.email?.split("@")[0] || "Agent"}</p>
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
                onClick={() => {
                  localStorage.removeItem("user")
                  window.location.href = "/"
                }}
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
          <h2 className="text-3xl font-bold text-white mb-2">Sales Dashboard</h2>
          <p className="text-gray-400">Track your leads, manage sales, and monitor your performance.</p>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="leads" className="data-[state=active]:bg-red-600">
              My Leads
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-red-600">
              Recent Sales
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-red-600">
              Available Cars
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Active Leads</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your customer leads and inquiries
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <LeadsList
                  leads={leads}
                  searchTerm={debouncedSearchTerm}
                  getPriorityColor={getPriorityColor}
                  getStatusColor={getStatusColor}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Sales</CardTitle>
                <CardDescription className="text-gray-400">Your recent sales and commissions</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesList recentSales={recentSales} getStatusColor={getStatusColor} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Available Inventory</CardTitle>
                <CardDescription className="text-gray-400">Cars available for sale with inquiry counts</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryList availableCars={availableCars} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
