import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Image from "next/image"
import React from "react"
import { useRouter } from "next/navigation"

export interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number
  image: string
  status: string
  inquiries: number
}

interface InventoryListProps {
  availableCars: Car[]
}

const InventoryList: React.FC<InventoryListProps> = ({ availableCars }) => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      {availableCars.map((car) => (
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
              <p className="text-lg font-bold text-yellow-400">${car.price.toLocaleString()}</p>
              <p className="text-sm text-gray-400">{car.inquiries} customer inquiries</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-600">{car.status}</Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={() => router.push(`/car/${car.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InventoryList; 