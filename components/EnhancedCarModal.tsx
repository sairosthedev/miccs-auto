"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Save, DollarSign, Percent, Tag } from "lucide-react"

interface Car {
  id?: number
  make: string
  model: string
  year: number
  price: number
  originalPrice?: number
  discount?: number
  status: string
  images: (string | File)[]
  description?: string
  mileage?: number
  color?: string
  vin?: string
  inquiries?: number
}

interface EnhancedCarModalProps {
  open: boolean
  onClose: () => void
  onSave: (car: Car) => void
  car?: Car | null
}

export function EnhancedCarModal({ open, onClose, onSave, car }: EnhancedCarModalProps) {
  const [form, setForm] = useState<Car>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    originalPrice: 0,
    discount: 0,
    status: "Available",
    images: [],
    description: "",
    mileage: 0,
    color: "",
    vin: "",
    inquiries: 0,
  })

  useEffect(() => {
    if (car) {
      let originalPrice = car.originalPrice;
      if (!originalPrice && car.discount && car.discount > 0) {
        // Reverse-calculate original price from price and discount
        originalPrice = Math.round(car.price / (1 - car.discount / 100));
      } else if (!originalPrice) {
        originalPrice = car.price;
      }
      setForm({
        ...car,
        originalPrice,
        discount: car.discount || 0,
        images: car.images || [],
      })
    } else {
      setForm({
        make: "",
        model: "",
        year: new Date().getFullYear(),
        price: 0,
        originalPrice: 0,
        discount: 0,
        status: "Available",
        images: [],
        description: "",
        mileage: 0,
        color: "",
        vin: "",
        inquiries: 0,
      })
    }
  }, [car])

  const calculatePrice = () => {
    if (form.originalPrice && form.discount) {
      const discountedPrice = form.originalPrice * (1 - form.discount / 100)
      return Math.round(discountedPrice)
    }
    return form.price
  }

  const handleDiscountChange = (discount: number) => {
    const newPrice = form.originalPrice ? Math.round(form.originalPrice * (1 - discount / 100)) : form.price
    setForm(prev => ({
      ...prev,
      discount,
      price: newPrice
    }))
  }

  const handleOriginalPriceChange = (originalPrice: number) => {
    const newPrice = form.discount ? Math.round(originalPrice * (1 - form.discount / 100)) : originalPrice
    setForm(prev => ({
      ...prev,
      originalPrice,
      price: newPrice
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 10) : [];
    setForm(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalCar = {
      ...form,
      id: car?.id || Date.now(),
      price: calculatePrice(),
    }
    onSave(finalCar)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white flex items-center">
            <Tag className="h-5 w-5 mr-2 text-yellow-400" />
            {car ? "Edit Car" : "Add New Car"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Make</label>
                <Input
                  placeholder="e.g., BMW"
                  value={form.make}
                  onChange={(e) => setForm(prev => ({ ...prev, make: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Model</label>
                <Input
                  placeholder="e.g., M4 Competition"
                  value={form.model}
                  onChange={(e) => setForm(prev => ({ ...prev, model: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Year</label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm(prev => ({ ...prev, year: Number(e.target.value) }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                  required
                />
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-yellow-400" />
                Pricing & Discounts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Original Price</label>
                  <Input
                    type="number"
                    value={form.originalPrice || form.price}
                    onChange={(e) => handleOriginalPriceChange(Number(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Discount (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.discount || 0}
                    onChange={(e) => handleDiscountChange(Number(e.target.value))}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Final Price</label>
                  <div className="p-3 bg-gray-800 border border-gray-700 rounded-md">
                    <p className="text-lg font-bold text-yellow-400">${calculatePrice().toLocaleString()}</p>
                    {form.discount && form.discount > 0 && (
                      <p className="text-sm text-green-400">
                        Save ${((form.originalPrice || form.price) - calculatePrice()).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                <Select
                  value={form.status}
                  onValueChange={(value) => setForm(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Color</label>
                <Input
                  placeholder="e.g., Black"
                  value={form.color || ""}
                  onChange={(e) => setForm(prev => ({ ...prev, color: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Mileage</label>
                <Input
                  type="number"
                  placeholder="e.g., 5000"
                  value={form.mileage || ""}
                  onChange={(e) => setForm(prev => ({ ...prev, mileage: Number(e.target.value) }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">VIN</label>
                <Input
                  placeholder="e.g., WBS4Y9C01L5J12345"
                  value={form.vin || ""}
                  onChange={(e) => setForm(prev => ({ ...prev, vin: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <Textarea
                placeholder="Describe the car's features, condition, and highlights..."
                value={form.description || ""}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Upload Images (up to 10)</label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {form.images && form.images.length > 0 &&
                  form.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                      alt={`preview-${idx}`}
                      className="w-20 h-16 object-cover rounded border border-gray-700"
                    />
                  ))}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Preview</label>
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex gap-2">
                    {form.images && form.images.length > 0 ? (
                      form.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                          alt={`preview-${idx}`}
                          className="w-20 h-16 object-cover rounded border border-gray-700"
                        />
                      ))
                    ) : (
                      <div className="w-20 h-16 bg-gray-700 rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">
                      {form.year} {form.make} {form.model}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {form.color && `${form.color} • `}
                      {form.mileage && `${form.mileage.toLocaleString()} miles`}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-lg font-bold text-yellow-400">${calculatePrice().toLocaleString()}</p>
                      {form.discount && form.discount > 0 && (
                        <Badge className="bg-red-600">{form.discount}% OFF</Badge>
                      )}
                      <Badge className={form.status === "Available" ? "bg-green-600" : "bg-gray-600"}>
                        {form.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {car ? "Update Car" : "Add Car"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
