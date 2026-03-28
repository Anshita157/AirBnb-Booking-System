export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Room {
  id: string;
  hotelId: string;
  roomType: 'single' | 'double' | 'suite' | 'deluxe';
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  description: string;
  availability: RoomAvailability[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomAvailability {
  date: Date;
  available: boolean;
  occupancy?: number;
}

export interface HotelSearchFilter {
  location?: string;
  city?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  guests?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  amenities?: string[];
  roomType?: string;
}

export interface HotelDetails extends Hotel {
  rooms: Room[];
  totalRooms?: number;
  averagePrice?: number;
}

export interface HotelReview {
  id: string;
  hotelId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface HotelStats {
  totalHotels: number;
  totalRooms: number;
  occupancyRate: number;
  averageRating: number;
}
