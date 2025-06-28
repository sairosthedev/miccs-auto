import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Edit, Trash2, Share2 } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { useMemo } from "react"

export type Car = {
  id: number
  make: string
  model: string
  year: number
  price: number
  originalPrice?: number
  discount?: number
  status: string
  image: string
  addedDate: string
}

interface RecentCarsProps {
  cars: Car[]
  searchTerm: string
  onSearch: (term: string) => void
  onFilter: () => void
  onView: (car: Car) => void
  onEdit: (car: Car) => void
  onDelete: (car: Car) => void
  onShare: (car: Car) => void
}

export function RecentCars({ cars, searchTerm, onSearch, onFilter, onView, onEdit, onDelete, onShare }: RecentCarsProps) {
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredCars = useMemo(() => {
    const term = debouncedSearchTerm.toLowerCase()
    return cars.filter(car =>
      car.make.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term) ||
      car.year.toString().includes(term)
    )
  }, [cars, debouncedSearchTerm])

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Recent Cars</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your car inventory and listings
            </CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
              />
            </div>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700" onClick={onFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCars.map(car => (
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
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-lg font-bold text-yellow-400">${car.price.toLocaleString()}</p>
                    {car.originalPrice && car.discount && (
                      <>
                        <p className="text-sm text-gray-500 line-through">${car.originalPrice.toLocaleString()}</p>
                        <Badge className="bg-red-600">{car.discount}% OFF</Badge>
                      </>
                    )}
                  </div>
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
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700" onClick={() => onView(car)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700" onClick={() => onEdit(car)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-700" onClick={() => onShare(car)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    onClick={() => onDelete(car)}
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
  )
} 