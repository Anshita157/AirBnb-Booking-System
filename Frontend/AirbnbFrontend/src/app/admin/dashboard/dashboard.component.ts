import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../core/services/booking.service';
import { HotelService } from '../../core/services/hotel.service';
import { UserService } from '../../core/services/user.service';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalBookings = 0;
  totalRevenue = 0;
  totalUsers = 0;
  totalHotels = 0;
  pendingBookings = 0;
  recentBookings: any[] = [];
  loadingStats = true;

  constructor(
    private bookingService: BookingService,
    private hotelService: HotelService,
    private userService: UserService,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loadingStats = true;

    // Mock data for dashboard statistics
    this.totalBookings = 247;
    this.totalRevenue = 2847500;
    this.totalUsers = 1326;
    this.totalHotels = 45;
    this.pendingBookings = 12;

    // Mock recent bookings
    this.recentBookings = [
      {
        id: 'BK001',
        hotelName: 'Taj Hotel Mumbai',
        userName: 'Rajesh Kumar',
        checkIn: '2024-02-15',
        checkOut: '2024-02-20',
        status: 'confirmed',
        amount: 45000
      },
      {
        id: 'BK002',
        hotelName: 'Oberoi Delhi',
        userName: 'Priya Singh',
        checkIn: '2024-02-16',
        checkOut: '2024-02-18',
        status: 'pending',
        amount: 32000
      },
      {
        id: 'BK003',
        hotelName: 'Marriott Bangalore',
        userName: 'Amit Patel',
        checkIn: '2024-02-17',
        checkOut: '2024-02-21',
        status: 'confirmed',
        amount: 38500
      },
      {
        id: 'BK004',
        hotelName: 'ITC Kolkata',
        userName: 'Sneha Gupta',
        checkIn: '2024-02-14',
        checkOut: '2024-02-16',
        status: 'completed',
        amount: 28000
      }
    ];

    this.loadingStats = false;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed':
        return '#27ae60';
      case 'pending':
        return '#f39c12';
      case 'completed':
        return '#3498db';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  }

  navigateTo(path: string): void {
    this.router.navigate(['/admin', path]);
  }

  viewBookingDetails(bookingId: string): void {
    this.toastr.info(`View booking details: ${bookingId}`);
  }
}
