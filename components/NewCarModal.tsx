import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewCarModalProps {
  open: boolean
  onClose: () => void
  onAddCar: (car: { make: string; model: string; year: number; price: number; status: string }) => void
}

export function NewCarModal({ open, onClose, onAddCar }: NewCarModalProps) {
  const [form, setForm] = useState({ make: "", model: "", year: 2023, price: 0, status: "Available" })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Car</h2>
          <form
            onSubmit={e => {
              e.preventDefault()
              onAddCar(form)
              setForm({ make: "", model: "", year: 2023, price: 0, status: "Available" })
              onClose()
            }}
            className="space-y-4"
          >
            <Input
              placeholder="Make"
              value={form.make}
              onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
              required
            />
            <Input
              placeholder="Model"
              value={form.model}
              onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
              required
            />
            <Input
              placeholder="Year"
              type="number"
              value={form.year}
              onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))}
              required
            />
            <Input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
              required
            />
            <select
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Car</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 