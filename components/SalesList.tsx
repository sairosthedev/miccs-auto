import { Badge } from "@/components/ui/badge"
import React from "react"

export interface Sale {
  id: number
  customer: string
  car: string
  salePrice: number
  commission: number
  date: string
  status: string
}

interface SalesListProps {
  recentSales: Sale[]
  getStatusColor: (status: string) => string
}

const SalesList: React.FC<SalesListProps> = ({ recentSales, getStatusColor }) => (
  <div className="space-y-4">
    {recentSales.map((sale) => (
      <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <h4 className="font-semibold text-white">{sale.customer}</h4>
          <p className="text-sm text-gray-400">{sale.car}</p>
          <p className="text-xs text-gray-500">Sale Date: {sale.date}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-yellow-400">${sale.salePrice.toLocaleString()}</p>
          <p className="text-sm text-green-400">Commission: ${sale.commission.toLocaleString()}</p>
          <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
        </div>
      </div>
    ))}
  </div>
)

export default SalesList; 