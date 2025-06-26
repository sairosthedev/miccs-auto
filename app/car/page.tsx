import { mockCars } from "@/lib/mock";
import Image from "next/image";
import Link from "next/link";

export default function CarListPage() {
  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Cars</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockCars.map((car) => (
          <div key={car.id} className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
            <Image
              src={car.image || "/placeholder.svg"}
              alt={`${car.make} ${car.model}`}
              width={150}
              height={100}
              className="rounded-md object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{car.year} {car.make} {car.model}</h2>
              <p className="text-yellow-400 text-lg font-semibold mb-2">${car.price.toLocaleString()}</p>
              <p className="mb-1 text-gray-300">{car.description}</p>
              <ul className="text-sm text-gray-400 mb-2">
                <li><span className="font-semibold text-white">Mileage:</span> {car.mileage.toLocaleString()} miles</li>
                <li><span className="font-semibold text-white">Color:</span> {car.color}</li>
                <li><span className="font-semibold text-white">VIN:</span> {car.vin}</li>
                <li><span className="font-semibold text-white">Status:</span> {car.status}</li>
                <li><span className="font-semibold text-white">Inquiries:</span> {car.inquiries}</li>
              </ul>
              <Link href={`/car/${car.id}`}>
                <span className="inline-block mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">View Details</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 