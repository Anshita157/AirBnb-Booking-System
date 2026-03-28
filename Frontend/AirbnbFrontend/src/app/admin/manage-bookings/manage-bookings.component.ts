import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = true;
  selectedStatus = 'all';

  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookings = [
      { id: 'BK001', hotel: 'Taj Mumbai', guest: 'Rajesh Kumar', amount: 45000, status: 'confirmed', date: '2024-02-15' },
      { id: 'BK002', hotel: 'Oberoi Delhi', guest: 'Priya Singh', amount: 32000, status: 'pending', date: '2024-02-16' },
      { id: 'BK003', hotel: 'Marriott Bangalore', guest: 'Amit Patel', amount: 38500, status: 'confirmed', date: '2024-02-17' }
    ];
    this.loading = false;
  }

  updateStatus(bookingId: string, status: string): void {
    this.toastr.success(`Booking status updated to ${status}`);
  }

  onStatusChange(bookingId: string, event: any): void {
    const status = (event.target as HTMLSelectElement).value;
    this.updateStatus(bookingId, status);
  }

  viewDetails(bookingId: string): void {
    this.toastr.info(`View booking: ${bookingId}`);
  }
}
