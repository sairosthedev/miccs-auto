"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Heart, Package, Search, Eye, Trash2, LogOut, Settings, Star } from "lucide-react"

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Get user info from localStorage (demo purposes)
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}

  const stats = [
    { icon: Package, label: "Total Orders", value: "8", change: "2 pending delivery", color: "text-blue-400" },
    { icon: ShoppingCart, label: "Cart Items", value: "3", change: "Ready for checkout", color: "text-yellow-400" },
    { icon: Heart, label: "Saved Cars", value: "12", change: "5 new this week", color: "text-red-400" },
    {
      icon: Star,
      label: "Loyalty Points",
      value: "2,450",
      change: "Earn more with purchases",
      color: "text-purple-400",
    },
  ]

  const orders = [
    {
      id: "ORD-001",
      car: "2023 BMW M4 Competition",
      price: 75000,
      status: "Delivered",
      orderDate: "2024-01-10",
      deliveryDate: "2024-01-15",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "ORD-002",
      car: "2022 Mercedes-Benz C-Class",
      price: 45000,
      status: "In Transit",
      orderDate: "2024-01-20",
      deliveryDate: "2024-01-25",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "ORD-003",
      car: "2023 Audi A4",
      price: 42000,
      status: "Processing",
      orderDate: "2024-01-22",
      deliveryDate: "2024-01-30",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const cartItems = [
    {
      id: 1,
      make: "BMW",
      model: "X5",
      year: 2023,
      price: 65000,
      image: "/placeholder.svg?height=100&width=150",
      addedDate: "2024-01-20",
    },
    {
      id: 2,
      make: "Mercedes-Benz",
      model: "GLE",
      year: 2022,
      price: 58000,
      image: "/placeholder.svg?height=100&width=150",
      addedDate: "2024-01-21",
    },
    {
      id: 3,
      make: "Audi",
      model: "Q7",
      year: 2023,
      price: 62000,
      image: "/placeholder.svg?height=100&width=150",
      addedDate: "2024-01-22",
    },
  ]

  const savedCars = [
    {
      id: 1,
      make: "Porsche",
      model: "911 Turbo",
      year: 2023,
      price: 185000,
      image: "/placeholder.svg?height=100&width=150",
      savedDate: "2024-01-18",
    },
    {
      id: 2,
      make: "Ferrari",
      model: "F8 Tributo",
      year: 2022,
      price: 280000,
      image: "/placeholder.svg?height=100&width=150",
      savedDate: "2024-01-19",
    },
    {
      id: 3,
      make: "Lamborghini",
      model: "Huracan",
      year: 2023,
      price: 250000,
      image: "/placeholder.svg?height=100&width=150",
      savedDate: "2024-01-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-600"
      case "In Transit":
        return "bg-blue-600"
      case "Processing":
        return "bg-yellow-600"
      case "Cancelled":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const totalCartValue = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/miccs-auto-logo.png" alt="Miccs Auto Logo" width={100} height={50} className="h-10 w-auto" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white">My Account</h1>
                <p className="text-sm text-gray-400">Welcome back, {user.email?.split("@")[0] || "Customer"}</p>
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
          <h2 className="text-3xl font-bold text-white mb-2">Customer Dashboard</h2>
          <p className="text-gray-400">Manage your orders, cart, and saved vehicles.</p>
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="orders" className="data-[state=active]:bg-red-600">
              My Orders
            </TabsTrigger>
            <TabsTrigger value="cart" className="data-[state=active]:bg-red-600">
              Shopping Cart
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-red-600">
              Saved Cars
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-red-600">
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Order History</CardTitle>
                    <CardDescription className="text-gray-400">Track your car purchases and deliveries</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt={order.car}
                          width={80}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-white">{order.car}</h4>
                          <p className="text-sm text-gray-400">Order #{order.id}</p>
                          <p className="text-xs text-gray-500">
                            Ordered: {order.orderDate} | Expected: {order.deliveryDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-400">${order.price.toLocaleString()}</p>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cart Tab */}
          <TabsContent value="cart">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Shopping Cart</CardTitle>
                    <CardDescription className="text-gray-400">
                      {cartItems.length} items • Total: ${totalCartValue.toLocaleString()}
                    </CardDescription>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Proceed to Checkout</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={`${item.make} ${item.model}`}
                          width={80}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-white">
                            {item.year} {item.make} {item.model}
                          </h4>
                          <p className="text-sm text-gray-400">Added on {item.addedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg font-bold text-yellow-400">${item.price.toLocaleString()}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Cars Tab */}
          <TabsContent value="saved">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Saved Cars</CardTitle>
                <CardDescription className="text-gray-400">
                  Your favorite vehicles for future consideration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedCars.map((car) => (
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
                          <p className="text-sm text-gray-400">Saved on {car.savedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-lg font-bold text-yellow-400">${car.price.toLocaleString()}</p>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Personal Information</CardTitle>
                  <CardDescription className="text-gray-400">Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        defaultValue="John"
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        defaultValue="Doe"
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue={user.email || "customer@miccsauto.com"}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    />
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Update Profile</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Address Information</CardTitle>
                  <CardDescription className="text-gray-400">Delivery and billing address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      defaultValue="123 Main Street"
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">
                        City
                      </Label>
                      <Input
                        id="city"
                        defaultValue="New York"
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-white">
                        ZIP Code
                      </Label>
                      <Input
                        id="zip"
                        defaultValue="10001"
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                      />
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Update Address</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
