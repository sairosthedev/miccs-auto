"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Car, Users, Shield, TrendingUp, Star, Phone, Mail, MapPin } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export default function HomePage() {
  const router = useRouter()
  const [featuredCars, setFeaturedCars] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCars, setFilteredCars] = useState<any[]>([])

  useEffect(() => {
    async function fetchCars() {
      setLoading(true)
      setError("")
      try {
        const data = await apiFetch('/cars')
        // Optionally, pick only a few featured cars (e.g., first 6)
        const mapped = data.slice(0, 6).map((car: any) => ({
          id: car._id || car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
          originalPrice: car.originalPrice,
          image: car.images && car.images.length > 0
            ? (car.images[0].startsWith('http') ? car.images[0] : `http://localhost:5000${car.images[0]}`)
            : "/placeholder.svg?height=300&width=400",
          mileage: car.mileage ? car.mileage.toLocaleString() + ' miles' : '',
          fuel: car.fuel || '',
          transmission: car.transmission || '',
          discount: car.discount,
          createdAt: car.createdAt,
        }))
        setFeaturedCars(mapped)
      } catch (err: any) {
        setError(err.message || "Failed to fetch cars")
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  useEffect(() => {
    // Filter featured cars based on search term
    if (!searchTerm) {
      setFilteredCars(featuredCars)
    } else {
      const term = searchTerm.toLowerCase()
      setFilteredCars(
        featuredCars.filter(car =>
          (car.make && car.make.toLowerCase().includes(term)) ||
          (car.model && car.model.toLowerCase().includes(term)) ||
          (car.year && car.year.toString().includes(term))
        )
      )
    }
  }, [searchTerm, featuredCars])

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
      <section className="relative py-20 bg-gradient-to-br from-black via-red-950/40 to-black overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-yellow-400/10 via-red-600/10 to-black opacity-60 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
              Premium Cars, <span className="text-yellow-400">Unbeatable</span> Prices
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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 w-full sm:w-auto shadow-lg" onClick={() => {
                if (filteredCars.length > 0) {
                  const firstCar = filteredCars[0]
                  router.push(`/car/${firstCar.id}?source=main`)
                }
              }}>Search Cars</Button>
            </div>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-4 rounded-full text-lg shadow-xl mb-8 transition-transform hover:scale-105" onClick={() => router.push('/car')}>Browse Inventory</Button>
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm mt-6">
              <div className="flex items-center gap-2"><span className="text-green-400 text-lg">★</span> Trusted by 2,000+ customers</div>
              <div className="flex items-center gap-2"><span className="text-yellow-400 text-lg">✓</span> Certified Dealer</div>
              <div className="flex items-center gap-2"><span className="text-blue-400 text-lg">⏰</span> 24/7 Support</div>
              <div className="flex items-center gap-2"><span className="text-red-400 text-lg">💰</span> Money-back Guarantee</div>
            </div>
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
            {loading ? (
              <div className="col-span-3 text-center text-gray-400">Loading cars...</div>
            ) : error ? (
              <div className="col-span-3 text-center text-red-400">{error}</div>
            ) : filteredCars.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400">No cars available.</div>
            ) : (
              filteredCars.map((car) => (
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
                      {car.createdAt && new Date(car.createdAt) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) && (
                        <Badge className="absolute top-4 right-4 bg-green-500 text-white animate-pulse">New</Badge>
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
              ))
            )}
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

      {/* Testimonial Slider */}
      <section className="py-16 bg-gray-900/60">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-10">What Our Customers Say</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Image src="/user1.jpg" alt="Customer 1" width={48} height={48} className="rounded-full border-2 border-yellow-400" />
                <div>
                  <div className="font-semibold text-white">Jane Doe</div>
                  <div className="text-xs text-gray-400">BMW X5 Owner</div>
                </div>
              </div>
              <p className="text-gray-300 italic">“The process was smooth and the team was super helpful. I love my new car!”</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Image src="/user2.jpg" alt="Customer 2" width={48} height={48} className="rounded-full border-2 border-yellow-400" />
                <div>
                  <div className="font-semibold text-white">Michael Smith</div>
                  <div className="text-xs text-gray-400">Mercedes GLE Owner</div>
                </div>
              </div>
              <p className="text-gray-300 italic">“Best dealership experience I've ever had. Highly recommend Miccs Auto!”</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Image src="/user3.jpg" alt="Customer 3" width={48} height={48} className="rounded-full border-2 border-yellow-400" />
                <div>
                  <div className="font-semibold text-white">Sarah Lee</div>
                  <div className="text-xs text-gray-400">Audi Q7 Owner</div>
                </div>
              </div>
              <p className="text-gray-300 italic">“Great prices and amazing selection. I found exactly what I wanted!”</p>
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
              <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex gap-4 justify-center md:justify-start">
                  <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 text-2xl"><i className="fab fa-facebook"></i></a>
                  <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 text-2xl"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 text-2xl"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-red-500 text-2xl"><i className="fab fa-youtube"></i></a>
                </div>
                <form className="flex gap-2 justify-center md:justify-end">
                  <Input type="email" placeholder="Subscribe to our newsletter" className="bg-gray-800 border-gray-700 text-white" />
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">Subscribe</Button>
                </form>
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
