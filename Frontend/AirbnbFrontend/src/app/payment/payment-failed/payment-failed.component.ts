import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit {
  bookingId: string = '';
  reason: string = 'Payment could not be processed due to an unknown error.';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['bookingId'] || '';
      this.reason = params['reason'] || this.reason;
    });
  }

  retryPayment(): void {
    this.router.navigate(['/payment'], {
      queryParams: { bookingId: this.bookingId }
    });
  }

  goToMyBookings(): void {
    this.router.navigate(['/booking/my-bookings']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
