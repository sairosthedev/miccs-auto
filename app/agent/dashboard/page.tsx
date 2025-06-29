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
import { StatsGrid } from "@/components/StatsGrid"
import LeadsList from "@/components/LeadsList"
import SalesList from "@/components/SalesList"
import InventoryList from "@/components/InventoryList"
import { apiFetch } from "@/lib/api"

export default function AgentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [orders, setOrders] = useState<any[]>([])
  const [cars, setCars] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError("")
      try {
        // Get token from localStorage/sessionStorage
        const token = localStorage.getItem("token") || sessionStorage.getItem("token")
        // Fetch assigned orders (leads/sales)
        const ordersRes = await apiFetch("/agents/orders", {}, token)
        setOrders(ordersRes)
        // Fetch all cars (inventory)
        const carsRes = await apiFetch("/cars")
        setCars(carsRes)
      } catch (err: any) {
        setError(err.message || "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Stats calculation (example, can be improved)
  const completedSales = orders.filter((o) => o.status === "Completed")
  const stats = [
    { icon: Target, label: "My Sales This Month", value: completedSales.length.toString(), change: "", color: "text-green-400" },
    {
      icon: DollarSign,
      label: "Commission Earned",
      value: "$" + completedSales.reduce((sum, o) => sum + (o.commission || 0), 0).toLocaleString(),
      change: "",
      color: "text-yellow-400",
    },
    { icon: Users, label: "Active Leads", value: orders.length.toString(), change: "", color: "text-blue-400" },
    { icon: TrendingUp, label: "Conversion Rate", value: orders.length ? Math.round((completedSales.length / orders.length) * 100) + "%" : "0%", change: "", color: "text-purple-400" },
  ]

  // Map orders to leads (for demo, treat all orders as leads)
  const leads = orders.map((order) => {
    const car = order.carId || {}
    const userObj = order.userId || {}
    return {
      id: order._id,
      name: userObj.username || userObj.email || "Customer",
      email: userObj.email || "",
      phone: userObj.phone || "",
      interestedCar: car.year && car.make && car.model ? `${car.year} ${car.make} ${car.model}` : car.model || "",
      status: order.status === "Completed" ? "Hot Lead" : order.status === "Pending" ? "Follow Up" : order.status,
      lastContact: order.updatedAt ? new Date(order.updatedAt).toLocaleString() : "-",
      priority: order.status === "Completed" ? "high" : "medium",
    }
  })

  // Map orders to recent sales (completed only)
  const recentSales = completedSales.map((order) => {
    const car = order.carId || {}
    const userObj = order.userId || {}
    return {
      id: order._id,
      customer: userObj.username || userObj.email || "Customer",
      car: car.year && car.make && car.model ? `${car.year} ${car.make} ${car.model}` : car.model || "",
      salePrice: order.totalPrice || car.price || 0,
      commission: order.commission || 0,
      date: order.updatedAt ? new Date(order.updatedAt).toISOString().slice(0, 10) : "",
      status: order.status,
    }
  })

  // Map cars to available inventory
  const availableCars = cars.filter((car) => car.inStock && !car.sold).map((car) => ({
    id: car._id || car.id,
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
    image: car.images && car.images.length > 0 ? (car.images[0].startsWith("http") ? car.images[0] : `http://localhost:5000${car.images[0]}`) : "/placeholder.svg?height=100&width=150",
    status: "Available",
    inquiries: 0, // You can add inquiry logic if available
  }))

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-red-400">{error}</div>
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
                  localStorage.removeItem("token")
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
