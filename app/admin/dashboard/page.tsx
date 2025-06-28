"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/AdminHeader"
import { StatsGrid } from "@/components/StatsGrid"
import { QuickActions } from "@/components/QuickActions"
import { RecentCars } from "@/components/RecentCars"
import { EnhancedCarModal } from "@/components/EnhancedCarModal"
import { SocialShareModal } from "@/components/SocialShareModal"
import type { Car as RecentCarsCar } from "@/components/RecentCars"
import {
  Car,
  Users,
  DollarSign,
  TrendingUp,
  Share2,
  Tag,
  Percent,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [cars, setCars] = useState<RecentCarsCar[]>([
    {
      id: 1,
      make: "BMW",
      model: "M4 Competition",
      year: 2023,
      price: 75000,
      originalPrice: 82000,
      discount: 9,
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
      originalPrice: 75000,
      discount: 9,
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
  ])
  const [showCarModal, setShowCarModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [editCar, setEditCar] = useState<RecentCarsCar | null>(null)
  const [selectedCarForShare, setSelectedCarForShare] = useState<RecentCarsCar | null>(null)

  const stats = [
    { icon: Car, label: "Total Cars", value: cars.length.toString(), change: "+12 this month", color: "text-blue-400" },
    { icon: DollarSign, label: "Total Sales", value: "$2.4M", change: "+18% from last month", color: "text-green-400" },
    { icon: Users, label: "Active Customers", value: "1,247", change: "+5% this week", color: "text-purple-400" },
    { icon: TrendingUp, label: "Monthly Revenue", value: "$340K", change: "+22% increase", color: "text-yellow-400" },
  ]

  // Handlers for actions
  const handleSettings = () => alert("Settings clicked")
  const handleLogout = () => alert("Logout clicked")
  const handleAddCar = () => setShowCarModal(true)
  const handleViewReports = () => router.push("/admin/view-reports")
  const handleManageUsers = () => router.push("/admin/manage-users")
  const handleViewCar = (car: RecentCarsCar) => alert(`View car: ${car.make} ${car.model}`)
  const handleEditCar = (car: RecentCarsCar) => {
    setEditCar(car)
    setShowCarModal(true)
  }
  const handleDeleteCar = (car: RecentCarsCar) => {
    if (window.confirm(`Are you sure you want to delete ${car.make} ${car.model}?`)) {
      setCars(cars.filter(c => c.id !== car.id))
    }
  }
  const handleShareCar = (car: RecentCarsCar) => {
    setSelectedCarForShare(car)
    setShowShareModal(true)
  }
  const handleFilter = () => alert("Filter clicked")

  // Add or update car
  const handleAddCarSubmit = (car: { 
    make: string; 
    model: string; 
    year: number; 
    price: number; 
    originalPrice?: number;
    discount?: number;
    status: string;
    image: string;
    description?: string;
    mileage?: number;
    color?: string;
    vin?: string;
  }) => {
    if (editCar) {
      setCars(cars.map(c => c.id === editCar.id ? { 
        ...editCar, 
        ...car,
        addedDate: editCar.addedDate
      } : c))
      setEditCar(null)
    } else {
      setCars([
        {
          id: Date.now(),
          ...car,
          addedDate: new Date().toISOString().slice(0, 10),
        },
        ...cars,
      ])
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader onSettings={handleSettings} onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Admin!</h2>
          <p className="text-gray-400">Here's what's happening with your car dealership today.</p>
        </div>
        <StatsGrid stats={stats} />
        <QuickActions
          onAddCar={handleAddCar}
          onViewReports={handleViewReports}
          onManageUsers={handleManageUsers}
        />
        <RecentCars
          cars={cars}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilter={handleFilter}
          onView={handleViewCar}
          onEdit={handleEditCar}
          onDelete={handleDeleteCar}
          onShare={handleShareCar}
        />
      </div>
      
      {/* Enhanced Car Modal */}
      <EnhancedCarModal
        open={showCarModal}
        onClose={() => { setShowCarModal(false); setEditCar(null) }}
        onSave={handleAddCarSubmit}
        car={editCar}
      />

      {/* Social Share Modal */}
      <SocialShareModal
        open={showShareModal}
        onClose={() => { setShowShareModal(false); setSelectedCarForShare(null) }}
        car={selectedCarForShare}
      />
    </div>
  )
}
