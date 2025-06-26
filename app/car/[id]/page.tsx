"use client";
import { useParams } from "next/navigation";
import { mockCars } from "@/lib/mock";
import Image from "next/image";
import Link from "next/link";

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params?.id;
  const car = mockCars.find((c) => String(c.id) === String(carId));

  if (!car) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Car Not Found</h1>
        <Link href="/agent/dashboard#inventory" className="text-red-400 hover:underline mt-4">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 flex flex-col items-center">
      <Link href="/agent/dashboard#inventory" className="text-red-400 hover:underline mb-6 self-start">&larr; Back to Dashboard</Link>
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-2xl flex flex-col items-center">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={`${car.make} ${car.model}`}
          width={250}
          height={150}
          className="rounded-md object-cover mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{car.year} {car.make} {car.model}</h1>
        <p className="text-yellow-400 text-2xl font-semibold mb-4">${car.price.toLocaleString()}</p>
        <p className="mb-4 text-gray-300 text-center">{car.description}</p>
        <ul className="text-md text-gray-400 mb-4 w-full max-w-md">
          <li><span className="font-semibold text-white">Mileage:</span> {car.mileage.toLocaleString()} miles</li>
          <li><span className="font-semibold text-white">Color:</span> {car.color}</li>
          <li><span className="font-semibold text-white">VIN:</span> {car.vin}</li>
          <li><span className="font-semibold text-white">Status:</span> {car.status}</li>
          <li><span className="font-semibold text-white">Inquiries:</span> {car.inquiries}</li>
        </ul>
      </div>
    </div>
  );
} 