import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../core/services/hotel.service';
import { Hotel } from '../../core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = false;
  searchQuery = '';

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedHotels();
  }

  private loadFeaturedHotels(): void {
    this.loading = true;
    // Mock data for development
    this.hotels = this.getMockHotels();
    this.loading = false;
  }

  onViewDetails(hotelId: string): void {
    this.router.navigate(['/home/hotel', hotelId]);
  }

  onBookNow(hotelId: string): void {
    this.router.navigate(['/booking/booking-page'], {
      queryParams: { hotelId }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home/search'], {
        queryParams: { q: this.searchQuery }
      });
    }
  }

  // Mock data for development
  private getMockHotels(): Hotel[] {
    return [
      {
        id: '1',
        name: 'Luxury Downtown Hotel',
        description: 'Experience luxury in the heart of the city with world-class amenities',
        location: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        image: 'https://via.placeholder.com/300x200?text=Luxury+Hotel',
        rating: 4.8,
        reviewsCount: 245,
        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
        checkInTime: '14:00',
        checkOutTime: '11:00'
      },
      {
        id: '2',
        name: 'Boutique Beach Resort',
        description: 'Relax on pristine beaches with modern accommodations and spa services',
        location: '456 Ocean Avenue',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        image: 'https://via.placeholder.com/300x200?text=Beach+Resort',
        rating: 4.6,
        reviewsCount: 189,
        amenities: ['Beach Access', 'Spa', 'WiFi', 'Bar'],
        checkInTime: '15:00',
        checkOutTime: '11:00'
      },
      {
        id: '3',
        name: 'Mountain View Lodge',
        description: 'Nestled in the mountains with breathtaking views and hiking trails',
        location: '789 Pine Road',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        image: 'https://via.placeholder.com/300x200?text=Mountain+Lodge',
        rating: 4.5,
        reviewsCount: 156,
        amenities: ['Hiking', 'Fireplace', 'WiFi', 'Restaurant'],
        checkInTime: '14:00',
        checkOutTime: '11:00'
      },
      {
        id: '4',
        name: 'Urban Hostel & Hotel',
        description: 'Budget-friendly accommodation with social atmosphere and modern facilities',
        location: '321 Park Lane',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        image: 'https://via.placeholder.com/300x200?text=Urban+Hostel',
        rating: 4.3,
        reviewsCount: 342,
        amenities: ['Lounge', 'Kitchen', 'WiFi', 'Tour Desk'],
        checkInTime: '13:00',
        checkOutTime: '11:00'
      },
      {
        id: '5',
        name: 'Garden Cottage Inn',
        description: 'Charming bed and breakfast with personalized service and home-cooked meals',
        location: '555 Flower Street',
        city: 'Portland',
        state: 'OR',
        country: 'USA',
        image: 'https://via.placeholder.com/300x200?text=Garden+Cottage',
        rating: 4.7,
        reviewsCount: 128,
        amenities: ['Garden', 'Breakfast', 'WiFi', 'Library'],
        checkInTime: '15:00',
        checkOutTime: '10:00'
      },
      {
        id: '6',
        name: 'Business Class Hotel',
        description: 'Perfect for business travelers with conference facilities and executive lounge',
        location: '777 Commerce Drive',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        image: 'https://via.placeholder.com/300x200?text=Business+Hotel',
        rating: 4.4,
        reviewsCount: 267,
        amenities: ['Conference', 'Business Center', 'WiFi', 'Gym'],
        checkInTime: '14:00',
        checkOutTime: '11:00'
      }
    ];
  }
}
