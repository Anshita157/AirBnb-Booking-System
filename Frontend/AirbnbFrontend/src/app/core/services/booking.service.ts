import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingHistory,
  CancelBookingRequest,
  BookingStats,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Create a new booking
   */
  createBooking(bookingData: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(
      `${this.apiUrl}${environment.endpoints.bookings.create}`,
      bookingData
    );
  }

  /**
   * Get booking by ID
   */
  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(
      `${this.apiUrl}${environment.endpoints.bookings.details.replace(':id', id)}`
    );
  }

  /**
   * Get all user bookings
   */
  getUserBookings(page: number = 1, limit: number = 10): Observable<{
    data: Booking[];
    total: number;
    page: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<{
      data: Booking[];
      total: number;
      page: number;
    }>(`${this.apiUrl}${environment.endpoints.bookings.list}`, { params });
  }

  /**
   * Get booking history
   */
  getBookingHistory(): Observable<BookingHistory> {
    return this.http.get<BookingHistory>(
      `${this.apiUrl}${environment.endpoints.bookings.history}`
    );
  }

  /**
   * Cancel booking
   */
  cancelBooking(data: CancelBookingRequest): Observable<Booking> {
    return this.http.post<Booking>(
      `${this.apiUrl}${environment.endpoints.bookings.cancel.replace(
        ':id',
        data.bookingId
      )}`,
      { reason: data.reason }
    );
  }

  /**
   * Get all bookings (Admin)
   */
  getAllBookings(page: number = 1, limit: number = 10): Observable<{
    data: Booking[];
    total: number;
    page: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<{
      data: Booking[];
      total: number;
      page: number;
    }>(`${this.apiUrl}${environment.endpoints.admin.bookings.list}`, { params });
  }

  /**
   * Update booking status (Admin)
   */
  updateBookingStatus(
    id: string,
    status: string
  ): Observable<Booking> {
    return this.http.put<Booking>(
      `${this.apiUrl}${environment.endpoints.admin.bookings.update.replace(':id', id)}`,
      { status }
    );
  }

  /**
   * Get booking statistics (Admin)
   */
  getBookingStats(): Observable<BookingStats> {
    return this.http.get<BookingStats>(
      `${this.apiUrl}/admin/bookings/stats`
    );
  }
}
