import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare } from "lucide-react"
import React, { useMemo } from "react"

export interface Lead {
  id: number
  name: string
  email: string
  phone: string
  interestedCar: string
  status: string
  lastContact: string
  priority: string
}

interface LeadsListProps {
  leads: Lead[]
  searchTerm: string
  getPriorityColor: (priority: string) => string
  getStatusColor: (status: string) => string
}

const LeadsList: React.FC<LeadsListProps> = ({ leads, searchTerm, getPriorityColor, getStatusColor }) => {
  const filteredLeads = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return leads.filter((lead) =>
      lead.name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      lead.interestedCar.toLowerCase().includes(term)
    )
  }, [leads, searchTerm])

  return (
    <div className="space-y-4">
      {filteredLeads.map((lead) => (
        <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(lead.priority)}`}></div>
            <div>
              <h4 className="font-semibold text-white">{lead.name}</h4>
              <p className="text-sm text-gray-400">Interested in: {lead.interestedCar}</p>
              <p className="text-xs text-gray-500">Last contact: {lead.lastContact}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
            <div className="flex items-center space-x-2">
              <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                 className="border-gray-700 text-gray-300 hover:bg-gray-700 rounded-md">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                  asChild
                >
                  <span><Phone className="h-4 w-4" /></span>
                </Button>
              </a>
              <a href={`mailto:${lead.email}`}
                 className="border-gray-700 text-gray-300 hover:bg-gray-700 rounded-md">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                  asChild
                >
                  <span><Mail className="h-4 w-4" /></span>
                </Button>
              </a>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
                onClick={() => alert(`Messaging for ${lead.name} coming soon!`)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LeadsList; 