"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Car, Users, Shield, TrendingUp, Star, Phone, Mail, MapPin } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const featuredCars = [
    {
      id: 1,
      make: "BMW",
      model: "M4 Competition",
      year: 2023,
      price: 75000,
      originalPrice: 82000,
      image: "/placeholder.svg?height=300&width=400",
      mileage: "5,000 miles",
      fuel: "Gasoline",
      transmission: "Automatic",
      discount: 9,
    },
    {
      id: 2,
      make: "Mercedes-Benz",
      model: "AMG GT",
      year: 2022,
      price: 68000,
      originalPrice: 75000,
      image: "/placeholder.svg?height=300&width=400",
      mileage: "12,000 miles",
      fuel: "Gasoline",
      transmission: "Automatic",
      discount: 9,
    },
    {
      id: 3,
      make: "Audi",
      model: "RS6 Avant",
      year: 2023,
      price: 85000,
      image: "/placeholder.svg?height=300&width=400",
      mileage: "8,000 miles",
      fuel: "Gasoline",
      transmission: "Automatic",
    },
  ]

  const stats = [
    { icon: Car, label: "Cars Available", value: "500+" },
    { icon: Users, label: "Happy Customers", value: "2,000+" },
    { icon: Shield, label: "Years Experience", value: "15+" },
    { icon: TrendingUp, label: "Sales This Month", value: "150+" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-red-900/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/miccs-auto-logo.png" alt="Miccs Auto Logo" width={120} height={60} className="h-12 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inventory" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Inventory
              </a>
              <a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Contact
              </a>
              <Button
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                onClick={() => router.push('/auth/login')}
              >
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-red-950/20 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              Premium Cars, Unbeatable Prices
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover your dream car from our extensive collection of premium vehicles. Quality guaranteed, prices that
              won't break the bank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by make, model, or year..."
                  className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                />
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 w-full sm:w-auto">Search Cars</Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <span>✓ No Hidden Fees</span>
              <span>✓ Warranty Included</span>
              <span>✓ Financing Available</span>
              <span>✓ Trade-ins Welcome</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section id="inventory" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">Featured Vehicles</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hand-picked premium vehicles from our extensive inventory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card
                key={car.id}
                className="bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300 group"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={`${car.make} ${car.model}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {car.discount && (
                      <Badge className="absolute top-4 left-4 bg-red-600 text-white">{car.discount}% OFF</Badge>
                    )}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/70 rounded-full px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">4.8</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2">
                    {car.year} {car.make} {car.model}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mb-4">
                    {car.mileage} • {car.fuel} • {car.transmission}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">${car.price.toLocaleString()}</div>
                      {car.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">${car.originalPrice.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <div className="flex gap-2 w-full">
                    <Link href={`/car/${car.id}?source=main`} className="flex-1">
                      <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                        View Details
                      </Button>
                    </Link>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">Add to Cart</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/car">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
                View All Inventory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-yellow-400">Why Choose Miccs Auto?</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                With over 15 years of experience in the automotive industry, Miccs Auto has built a reputation for
                quality, reliability, and exceptional customer service. We specialize in premium vehicles that combine
                performance with value.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Quality Guaranteed</h3>
                    <p className="text-gray-400">
                      Every vehicle undergoes rigorous inspection and comes with our quality guarantee.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Competitive Pricing</h3>
                    <p className="text-gray-400">
                      We offer the best prices in the market with transparent, no-hidden-fee pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Expert Support</h3>
                    <p className="text-gray-400">
                      Our experienced sales team is here to help you find the perfect vehicle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Car showroom"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Get In Touch</h2>
            <p className="text-xl text-gray-300">Ready to find your dream car? Contact us today!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4">
                <Phone className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Call Us</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4">
                <Mail className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Email Us</h3>
              <p className="text-gray-400">info@miccsauto.com</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-gray-400">123 Auto Street, Car City, CC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/miccs-auto-logo.png"
                alt="Miccs Auto Logo"
                width={120}
                height={60}
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm">
                Your trusted partner for premium automotive sales. Quality cars, exceptional service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Inventory
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Financing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Trade-In
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Customer Care</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Miccs Auto Car Sales. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
