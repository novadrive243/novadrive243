
export interface Vehicle {
  id: string;
  name: string;
  image: string;
  comfort: number;
  capacity: number;
  price: {
    hourly: number;
    daily: number;
    monthly: number;
    tenDayPackage: number;
    fifteenDayPackage: number;
    twentyFiveDayPackage: number;
  };
}

export const vehicles: Vehicle[] = [
  {
    id: 'chevrolet-tahoe',
    name: 'Chevrolet Tahoe',
    image: '/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png',
    comfort: 4.5,
    capacity: 6,
    price: {
      hourly: 60,
      daily: 350,
      monthly: 8400,
      tenDayPackage: 3150,
      fifteenDayPackage: 4500,
      twentyFiveDayPackage: 7250
    }
  },
  {
    id: 'nissan-xterra',
    name: 'Nissan X-Terra',
    image: '/lovable-uploads/6a588e4a-4639-4bb2-800c-1d4ca6adb059.png',
    comfort: 3.5,
    capacity: 6,
    price: {
      hourly: 35,
      daily: 200,
      monthly: 4200,
      tenDayPackage: 1800,
      fifteenDayPackage: 2650,
      twentyFiveDayPackage: 4200
    }
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    image: '/lovable-uploads/d46547d7-848f-40e6-8df3-826987faa8ef.png',
    comfort: 3.5,
    capacity: 6,
    price: {
      hourly: 25,
      daily: 150,
      monthly: 3150,
      tenDayPackage: 1350,
      fifteenDayPackage: 1950,
      twentyFiveDayPackage: 3150
    }
  }
];
