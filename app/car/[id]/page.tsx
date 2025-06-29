"use client";
import { useParams, useSearchParams } from "next/navigation";
import { mockCars } from "@/lib/mock";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Car, Hash, Users, CheckCircle, DollarSign } from 'lucide-react';

export default function CarDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const carId = params?.id;
  const source = searchParams.get('source');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const car = mockCars.find((c) => String(c.id) === String(carId));

  // Generate multiple images for carousel (in real app, these would come from API)
  const carImages = car ? [
    car.image,
    car.image.replace('.jpg', '-2.jpg'),
    car.image.replace('.jpg', '-3.jpg'),
    car.image.replace('.jpg', '-4.jpg'),
  ] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.role);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const getBackLink = () => {
    // If source parameter is provided, use it
    if (source) {
      switch (source) {
        case 'admin':
          return '/admin/dashboard';
        case 'main':
          return '/';
        case 'listing':
          return '/car';
        case 'agent':
          return '/agent/dashboard#inventory';
        default:
          break;
      }
    }
    
    // If no source parameter, determine based on user role
    if (userRole) {
      switch (userRole) {
        case 'admin':
          return '/admin/dashboard';
        case 'sales_agent':
          return '/agent/dashboard#inventory';
        case 'customer':
          return '/customer/dashboard';
        default:
          break;
      }
    }
    
    // Default fallback
    return '/agent/dashboard#inventory';
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400">Car Not Found</h1>
          <p className="text-gray-400 mb-6">The requested vehicle could not be located.</p>
          <Link 
            href={getBackLink()} 
            className="inline-flex items-center px-6 py-3 bg-gray-800/70 hover:bg-gray-700/80 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 border border-gray-700 hover:border-gray-600 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            href={getBackLink()} 
            className="inline-flex items-center px-4 py-2 bg-gray-800/70 hover:bg-gray-700/80 text-gray-300 hover:text-white rounded-lg transition-all duration-200 border border-gray-700 hover:border-gray-600 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="overflow-hidden rounded-xl bg-gray-800">
                <div ref={emblaRef} className="embla">
                  <div className="embla__container">
                    {carImages.map((image, index) => (
                      <div key={index} className="embla__slide flex-[0_0_100%]">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${car.make} ${car.model} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {carImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === selectedIndex ? 'bg-red-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{car.year} {car.make} {car.model}</h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  {car.status}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {car.inquiries} inquiries
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 rounded-xl">
              <div className="flex items-baseline">
                <DollarSign className="w-6 h-6 text-red-200 mr-1" />
                <span className="text-4xl font-bold">{car.price.toLocaleString()}</span>
              </div>
              <p className="text-red-200 text-sm mt-1">Financing available</p>
            </div>

            {/* Description */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{car.description}</p>
            </div>

            {/* Specifications */}
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Year</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Mileage</p>
                    <p className="font-semibold">{car.mileage.toLocaleString()} miles</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Color</p>
                    <p className="font-semibold">{car.color}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Hash className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">VIN</p>
                    <p className="font-semibold text-sm">{car.vin}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Contact Seller
              </button>
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
        }
      `}</style>
    </div>
  );
} 