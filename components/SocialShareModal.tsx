"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Share2, Facebook, Twitter, Instagram, Linkedin, Copy, Check } from "lucide-react"
import Image from "next/image"

interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number
  image: string
  status: string
}

interface SocialShareModalProps {
  open: boolean
  onClose: () => void
  car: Car | null
}

export function SocialShareModal({ open, onClose, car }: SocialShareModalProps) {
  const [customMessage, setCustomMessage] = useState("")
  const [copied, setCopied] = useState(false)

  if (!open || !car) return null

  const shareUrl = `${window.location.origin}/car/${car.id}`
  const defaultMessage = `Check out this amazing ${car.year} ${car.make} ${car.model} for only $${car.price.toLocaleString()}! 🚗✨`
  const message = customMessage || defaultMessage

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(message)}`
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-pink-600 hover:bg-pink-700",
      url: `https://www.instagram.com/`
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
  ]

  const handleShare = (url: string) => {
    if (url.includes("instagram.com")) {
      alert("For Instagram sharing, please copy the link and share manually")
      return
    }
    window.open(url, "_blank", "width=600,height=400")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-yellow-400" />
            Share Car Listing
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
        <CardContent className="space-y-6">
          {/* Car Preview */}
          <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
            <Image
              src={car.image || "/placeholder.svg"}
              alt={`${car.make} ${car.model}`}
              width={80}
              height={60}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-white">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="text-lg font-bold text-yellow-400">${car.price.toLocaleString()}</p>
              <Badge className="bg-green-600">{car.status}</Badge>
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Custom Message (Optional)</label>
            <Textarea
              placeholder={defaultMessage}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
              rows={3}
            />
          </div>

          {/* Share Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300">Share on Social Media</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {shareLinks.map((platform) => (
                <Button
                  key={platform.name}
                  className={`${platform.color} text-white`}
                  onClick={() => handleShare(platform.url)}
                >
                  <platform.icon className="h-4 w-4 mr-2" />
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Or copy the link</h4>
            <div className="flex space-x-2">
              <Input
                value={shareUrl}
                readOnly
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-400">Link copied to clipboard!</p>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Preview</h4>
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">{message}</p>
              <p className="text-xs text-gray-500 mt-1">{shareUrl}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 