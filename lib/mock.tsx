export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  status: string;
  inquiries: number;
  description: string;
  mileage: number;
  color: string;
  vin: string;
}

export const mockCars: Car[] = [
  {
    id: 1,
    make: "BMW",
    model: "M4 Competition",
    year: 2023,
    price: 75000,
    image: "/cars/bmw-m4.jpg",
    status: "Available",
    inquiries: 5,
    description: "A high-performance coupe with advanced features and luxury interior.",
    mileage: 1200,
    color: "Black",
    vin: "WBS4Y9C01L5J12345",
  },
  {
    id: 2,
    make: "Mercedes-Benz",
    model: "AMG GT",
    year: 2022,
    price: 68000,
    image: "/cars/amg-gt.jpg",
    status: "Available",
    inquiries: 3,
    description: "A luxury sports car with a powerful V8 engine and sleek design.",
    mileage: 5000,
    color: "Silver",
    vin: "WDDYJ7JA3JA012345",
  },
  {
    id: 3,
    make: "Audi",
    model: "RS6 Avant",
    year: 2023,
    price: 85000,
    image: "/cars/audi-rs6.jpg",
    status: "Available",
    inquiries: 7,
    description: "A high-performance wagon with Quattro all-wheel drive and spacious interior.",
    mileage: 800,
    color: "Red",
    vin: "WUAPCBF21NN123456",
  },
]; 