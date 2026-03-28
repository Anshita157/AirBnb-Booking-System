import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Hotel,
  Room,
  HotelSearchFilter,
  HotelDetails,
  HotelReview,
  HotelStats,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all hotels
   */
  getAllHotels(page: number = 1, limit: number = 10): Observable<{
    data: Hotel[];
    total: number;
    page: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<{
      data: Hotel[];
      total: number;
      page: number;
    }>(`${this.apiUrl}${environment.endpoints.hotels.list}`, { params });
  }

  /**
   * Get hotel by ID
   */
  getHotelById(id: string): Observable<HotelDetails> {
    return this.http.get<HotelDetails>(
      `${this.apiUrl}${environment.endpoints.hotels.details.replace(':id', id)}`
    );
  }

  /**
   * Search hotels based on filters
   */
  searchHotels(filters: HotelSearchFilter): Observable<Hotel[]> {
    let params = new HttpParams();

    if (filters.location) {
      params = params.set('location', filters.location);
    }
    if (filters.city) {
      params = params.set('city', filters.city);
    }
    if (filters.checkInDate) {
      params = params.set('checkIn', filters.checkInDate.toString());
    }
    if (filters.checkOutDate) {
      params = params.set('checkOut', filters.checkOutDate.toString());
    }
    if (filters.guests) {
      params = params.set('guests', filters.guests.toString());
    }
    if (filters.priceMin !== undefined) {
      params = params.set('priceMin', filters.priceMin.toString());
    }
    if (filters.priceMax !== undefined) {
      params = params.set('priceMax', filters.priceMax.toString());
    }
    if (filters.rating) {
      params = params.set('rating', filters.rating.toString());
    }
    if (filters.amenities && filters.amenities.length > 0) {
      params = params.set('amenities', filters.amenities.join(','));
    }

    return this.http.get<Hotel[]>(
      `${this.apiUrl}${environment.endpoints.hotels.search}`,
      { params }
    );
  }

  /**
   * Get hotel reviews
   */
  getHotelReviews(hotelId: string): Observable<HotelReview[]> {
    return this.http.get<HotelReview[]>(
      `${this.apiUrl}${environment.endpoints.hotels.reviews.replace(':id', hotelId)}`
    );
  }

  /**
   * Add hotel review
   */
  addHotelReview(
    hotelId: string,
    review: { rating: number; comment: string }
  ): Observable<HotelReview> {
    return this.http.post<HotelReview>(
      `${this.apiUrl}${environment.endpoints.hotels.reviews.replace(':id', hotelId)}`,
      review
    );
  }

  /**
   * Get hotel statistics
   */
  getHotelStats(): Observable<HotelStats> {
    return this.http.get<HotelStats>(
      `${this.apiUrl}${environment.endpoints.hotels.stats}`
    );
  }

  /**
   * Get available rooms for a hotel
   */
  getAvailableRooms(
    hotelId: string,
    checkIn: Date,
    checkOut: Date,
    guests: number
  ): Observable<Room[]> {
    const params = new HttpParams()
      .set('checkIn', checkIn.toString())
      .set('checkOut', checkOut.toString())
      .set('guests', guests.toString());

    return this.http.get<Room[]>(
      `${this.apiUrl}/hotels/${hotelId}/available-rooms`,
      { params }
    );
  }

  /**
   * Create hotel (Admin)
   */
  createHotel(hotelData: Partial<Hotel>): Observable<Hotel> {
    return this.http.post<Hotel>(
      `${this.apiUrl}${environment.endpoints.admin.hotels.create}`,
      hotelData
    );
  }

  /**
   * Update hotel (Admin)
   */
  updateHotel(id: string, hotelData: Partial<Hotel>): Observable<Hotel> {
    return this.http.put<Hotel>(
      `${this.apiUrl}${environment.endpoints.admin.hotels.update.replace(':id', id)}`,
      hotelData
    );
  }

  /**
   * Delete hotel (Admin)
   */
  deleteHotel(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}${environment.endpoints.admin.hotels.delete.replace(':id', id)}`
    );
  }

  /**
   * Create room (Admin)
   */
  createRoom(roomData: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(
      `${this.apiUrl}${environment.endpoints.admin.rooms.create}`,
      roomData
    );
  }

  /**
   * Update room (Admin)
   */
  updateRoom(id: string, roomData: Partial<Room>): Observable<Room> {
    return this.http.put<Room>(
      `${this.apiUrl}${environment.endpoints.admin.rooms.update.replace(':id', id)}`,
      roomData
    );
  }

  /**
   * Delete room (Admin)
   */
  deleteRoom(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}${environment.endpoints.admin.rooms.delete.replace(':id', id)}`
    );
  }
}
