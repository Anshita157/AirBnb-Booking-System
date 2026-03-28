import { User } from './user.model';
import { Hotel, Room } from './hotel.model';

export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  specialRequests?: string;
  totalPrice: number;
  numberOfNights: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt?: Date;
  cancellationReason?: string;
  cancellationDate?: Date;
}

export interface BookingRequest {
  hotelId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export interface BookingResponse {
  id: string;
  bookingDetails: Booking;
  hotelDetails: Hotel;
  roomDetails: Room;
  totalPrice: number;
  bookingDate: Date;
}

export interface BookingHistory {
  id: string;
  userId: string;
  bookings: Booking[];
  totalBookings: number;
  totalSpent: number;
}

export interface CancelBookingRequest {
  bookingId: string;
  reason?: string;
}

export interface BookingStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  pendingPayments: number;
}
