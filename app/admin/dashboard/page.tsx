"use client"

import { useState, useEffect } from "react"
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
import { apiFetch } from "@/lib/api"

// Extend RecentCarsCar to include all fields needed for editing
type DashboardCar = RecentCarsCar & {
  images?: (string | File)[];
  color?: string;
  mileage?: number;
  vin?: string;
  description?: string;
};

export default function AdminDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [cars, setCars] = useState<DashboardCar[]>([])
  const [showCarModal, setShowCarModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [editCar, setEditCar] = useState<DashboardCar | null>(null)
  const [selectedCarForShare, setSelectedCarForShare] = useState<DashboardCar | null>(null)

  const stats = [
    { icon: Car, label: "Total Cars", value: cars.length.toString(), change: "+12 this month", color: "text-blue-400" },
    { icon: DollarSign, label: "Total Sales", value: "$2.4M", change: "+18% from last month", color: "text-green-400" },
    { icon: Users, label: "Active Customers", value: "1,247", change: "+5% this week", color: "text-purple-400" },
    { icon: TrendingUp, label: "Monthly Revenue", value: "$340K", change: "+22% increase", color: "text-yellow-400" },
  ]

  // Fetch real car data on mount
  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await apiFetch("/cars");
        // Map backend data to RecentCarsCar type if needed
        const mapped = data.map((car: any) => ({
          id: car._id || car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
          originalPrice: car.originalPrice,
          discount: car.discount,
          status: car.sold ? "Sold" : "Available",
          image: car.images && car.images.length > 0
            ? (car.images[0].startsWith('http') ? car.images[0] : `http://localhost:5000${car.images[0]}`)
            : "/placeholder.svg?height=100&width=150",
          addedDate: car.createdAt ? car.createdAt.slice(0, 10) : "",
          images: car.images || [],
          color: car.color || "",
          mileage: car.mileage || 0,
          vin: car.vin || "",
          description: car.description || "",
        }))
        setCars(mapped)
      } catch (err) {
        // Optionally handle error
        console.error("Failed to fetch cars:", err)
      }
    }
    fetchCars()
  }, [])

  // Handlers for actions
  const handleSettings = () => alert("Settings clicked")
  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'GET' });
      // Clear localStorage/sessionStorage if you store tokens
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Redirect to landing page
      router.push('/');
    } catch (err) {
      alert('Logout failed');
    }
  }
  const handleAddCar = () => setShowCarModal(true)
  const handleViewReports = () => router.push("/admin/view-reports")
  const handleManageUsers = () => router.push("/admin/manage-users")
  const handleViewCar = (car: DashboardCar) => router.push(`/car/${car.id}?source=admin`)
  const handleEditCar = (car: DashboardCar) => {
    setEditCar({
      ...car,
      images: car.images ? car.images : (car.image ? [car.image] : []),
      color: car.color || "",
      mileage: car.mileage || 0,
      vin: car.vin || "",
      description: car.description || "",
    })
    setShowCarModal(true)
  }
  const handleDeleteCar = async (car: DashboardCar) => {
    if (window.confirm(`Are you sure you want to delete ${car.make} ${car.model}?`)) {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in again.');
          return;
        }
        await apiFetch(`/cars/${car.id}`, {
          method: 'DELETE',
        }, token);

        // Refresh car list
        const carsRes = await apiFetch('/cars');
        const mapped = carsRes.map((car: any) => ({
          id: car._id || car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
          originalPrice: car.originalPrice,
          discount: car.discount,
          status: car.sold ? 'Sold' : 'Available',
          image: car.images && car.images.length > 0
            ? (car.images[0].startsWith('http') ? car.images[0] : `http://localhost:5000${car.images[0]}`)
            : '/placeholder.svg?height=100&width=150',
          addedDate: car.createdAt ? car.createdAt.slice(0, 10) : '',
          images: car.images || [],
        }));
        setCars(mapped);
      } catch (err) {
        alert('Failed to delete car: ' + (err as Error).message);
      }
    }
  }
  const handleShareCar = (car: DashboardCar) => {
    setSelectedCarForShare(car)
    setShowShareModal(true)
  }
  const handleFilter = () => alert("Filter clicked")

  // Add or update car
  const handleAddCarSubmit = async (car: any) => {
    try {
      let imageUrls = [];
      // If images are File objects, upload them
      if (car.images && car.images.length > 0 && car.images[0] instanceof File) {
        const formData = new FormData();
        car.images.forEach((img: File) => formData.append('images', img));
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in again.');
          return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'}/cars/upload-images`, {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to upload images');
        const data = await res.json();
        imageUrls = data.urls;
      } else if (car.images && car.images.length > 0) {
        imageUrls = car.images;
      }

      const carData = {
        ...car,
        images: imageUrls,
      };
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }
      if (car.id) {
        // Edit existing car
        await apiFetch(`/cars/${car.id}`, {
          method: 'PUT',
          body: JSON.stringify(carData),
        }, token);
      } else {
        // Add new car
        await apiFetch('/cars', {
          method: 'POST',
          body: JSON.stringify(carData),
        }, token);
      }

      // Refresh car list
      const carsRes = await apiFetch('/cars');
      const mapped = carsRes.map((car: any) => ({
        id: car._id || car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        originalPrice: car.originalPrice,
        discount: car.discount,
        status: car.sold ? 'Sold' : 'Available',
        image: car.images && car.images.length > 0
          ? (car.images[0].startsWith('http') ? car.images[0] : `http://localhost:5000${car.images[0]}`)
          : '/placeholder.svg?height=100&width=150',
        addedDate: car.createdAt ? car.createdAt.slice(0, 10) : '',
        images: car.images || [],
        color: car.color || '',
        mileage: car.mileage || 0,
        vin: car.vin || '',
        description: car.description || '',
      }));
      setCars(mapped);
      setEditCar(null);
    } catch (err) {
      alert('Failed to add/update car: ' + (err as Error).message);
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
        car={editCar as any}
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
