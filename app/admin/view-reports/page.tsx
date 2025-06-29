"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, AreaChart, Area } from "recharts"

const salesData = [
  { month: "Jan", sales: 120000, profit: 24000, units: 3 },
  { month: "Feb", sales: 90000, profit: 18000, units: 2 },
  { month: "Mar", sales: 150000, profit: 30000, units: 4 },
  { month: "Apr", sales: 110000, profit: 22000, units: 3 },
  { month: "May", sales: 170000, profit: 34000, units: 4 },
  { month: "Jun", sales: 140000, profit: 28000, units: 3 },
]

const statusData = [
  { name: "Available", value: 12 },
  { name: "Sold", value: 8 },
]

const topModelsData = [
  { model: "BMW X5", sales: 3, revenue: 180000 },
  { model: "Mercedes GLE", sales: 2, revenue: 140000 },
  { model: "Audi Q7", sales: 2, revenue: 120000 },
  { model: "Range Rover", sales: 1, revenue: 95000 },
]

const customerSatisfactionData = [
  { month: "Jan", satisfaction: 4.2 },
  { month: "Feb", satisfaction: 4.5 },
  { month: "Mar", satisfaction: 4.3 },
  { month: "Apr", satisfaction: 4.7 },
  { month: "May", satisfaction: 4.6 },
  { month: "Jun", satisfaction: 4.8 },
]

const profitMarginData = [
  { month: "Jan", margin: 20 },
  { month: "Feb", margin: 20 },
  { month: "Mar", margin: 20 },
  { month: "Apr", margin: 20 },
  { month: "May", margin: 20 },
  { month: "Jun", margin: 20 },
]

const PRIMARY = "#3B82F6" // Blue
const SECONDARY = "#1E40AF" // Darker blue
const SUCCESS = "#10B981" // Green
const WARNING = "#F59E0B" // Amber
const COLORS = [PRIMARY, "#6B7280"] // Blue for available, gray for sold

export default function ViewReportsPage() {
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0)
  const totalUnits = salesData.reduce((sum, item) => sum + item.units, 0)
  const avgProfitMargin = (totalProfit / totalSales * 100).toFixed(1)
  const avgSatisfaction = (customerSatisfactionData.reduce((sum, item) => sum + item.satisfaction, 0) / customerSatisfactionData.length).toFixed(1)

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Analytics & Reports</h1>
      
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalSales.toLocaleString()}</div>
            <div className="text-sm mt-1 text-green-400">+18% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalProfit.toLocaleString()}</div>
            <div className="text-sm mt-1 text-blue-400">{avgProfitMargin}% margin</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Cars Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalUnits}</div>
            <div className="text-sm mt-1 text-green-400">+2 this month</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{avgSatisfaction}/5.0</div>
            <div className="text-sm mt-1 text-green-400">+0.3 from last month</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Active Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-sm mt-1 text-amber-400">-1 this month</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Average Sale Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${(totalSales / totalUnits).toLocaleString()}</div>
            <div className="text-sm mt-1 text-gray-400">Per vehicle</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">40%</div>
            <div className="text-sm mt-1 text-gray-400">Inquiries to sales</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Monthly Sales & Profit Trend</CardTitle>
          </CardHeader>
          <CardContent> 
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#1F2937", border: "1px solid #374151", color: "#F9FAFB" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Legend wrapperStyle={{ color: "#F9FAFB" }} />
                  <Area type="monotone" dataKey="sales" stroke={PRIMARY} fill={PRIMARY} fillOpacity={0.3} strokeWidth={2} />
                  <Area type="monotone" dataKey="profit" stroke={SUCCESS} fill={SUCCESS} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1F2937", border: "1px solid #374151", color: "#F9FAFB" }} />
                  <Legend wrapperStyle={{ color: "#F9FAFB" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Top Performing Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topModelsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="model" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#9CA3AF" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#1F2937", border: "1px solid #374151", color: "#F9FAFB" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Legend wrapperStyle={{ color: "#F9FAFB" }} />
                  <Bar dataKey="revenue" fill={PRIMARY} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Customer Satisfaction Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerSatisfactionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[3.5, 5]} />
                  <Tooltip
                    contentStyle={{ background: "#1F2937", border: "1px solid #374151", color: "#F9FAFB" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Legend wrapperStyle={{ color: "#F9FAFB" }} />
                  <Line type="monotone" dataKey="satisfaction" stroke={SUCCESS} strokeWidth={3} dot={{ r: 5, fill: SUCCESS }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Insights */}
      <Card className="bg-gray-900 border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Business Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Performance Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Total revenue increased by 18% compared to last month</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Profit margin maintained at 20% consistently</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">BMW X5 remains the top-selling model</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Customer satisfaction improved to 4.8/5.0</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Recommendations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Consider expanding BMW inventory due to high demand</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Implement customer feedback system to maintain satisfaction</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Focus on Q2-Q3 marketing campaigns for summer sales</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Monitor inventory levels to optimize stock turnover</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}