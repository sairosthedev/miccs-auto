"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const salesData = [
  { month: "Jan", sales: 120000 },
  { month: "Feb", sales: 90000 },
  { month: "Mar", sales: 150000 },
  { month: "Apr", sales: 110000 },
  { month: "May", sales: 170000 },
  { month: "Jun", sales: 140000 },
]

const statusData = [
  { name: "Available", value: 12 },
  { name: "Sold", value: 8 },
]

const GOLD = "#FFD700"
const COLORS = [GOLD, "#FFFFFF"] // Gold for available, white for sold

export default function ViewReportsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-4" style={{ color: GOLD }}>Analytics & Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black border border-[rgba(255,215,0,0.2)]">
          <CardHeader>
            <CardTitle style={{ color: GOLD }}>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#fff" }}>$780,000</div>
            <div className="text-sm mt-1" style={{ color: GOLD }}>+18% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-black border border-[rgba(255,215,0,0.2)]">
          <CardHeader>
            <CardTitle style={{ color: GOLD }}>Cars Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#fff" }}>8</div>
            <div className="text-sm mt-1" style={{ color: GOLD }}>+2 this month</div>
          </CardContent>
        </Card>
        <Card className="bg-black border border-[rgba(255,215,0,0.2)]">
          <CardHeader>
            <CardTitle style={{ color: GOLD }}>Active Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "#fff" }}>12</div>
            <div className="text-sm mt-1" style={{ color: GOLD }}>-1 this month</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-black border border-[rgba(255,215,0,0.2)]">
          <CardHeader>
            <CardTitle style={{ color: GOLD }}>Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent> 
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#000", border: "1px solid " + GOLD, color: "#fff" }}
                    labelStyle={{ color: GOLD }}
                  />
                  <Legend wrapperStyle={{ color: "#fff" }} />
                  <Line type="monotone" dataKey="sales" stroke={GOLD} strokeWidth={3} dot={{ r: 5, fill: GOLD }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black border border-[rgba(255,215,0,0.2)]">
          <CardHeader>
            <CardTitle style={{ color: GOLD }}>Inventory Status</CardTitle>
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
                  <Tooltip contentStyle={{ background: "#000", border: "1px solid " + GOLD, color: "#fff" }} />
                  <Legend wrapperStyle={{ color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}