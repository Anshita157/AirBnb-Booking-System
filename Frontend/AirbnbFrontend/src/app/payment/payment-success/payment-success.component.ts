import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  paymentId: string = '';
  bookingId: string = '';
  amount: number = 0;
  invoiceDownloading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['paymentId'] || '';
      this.bookingId = params['bookingId'] || '';
      this.amount = params['amount'] || 0;
    });
  }

  downloadInvoice(): void {
    this.invoiceDownloading = true;
    this.paymentService.getInvoice(this.paymentId).subscribe({
      next: (response: any) => {
        // Handle both Blob and Invoice object responses
        if (response instanceof Blob) {
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(response);
          link.href = url;
          link.download = `Invoice-${this.paymentId}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        } else {
          // Handle Invoice object - convert to JSON or display
          const jsonString = JSON.stringify(response, null, 2);
          const blob = new Blob([jsonString], { type: 'application/json' });
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = `Invoice-${this.paymentId}.json`;
          link.click();
          window.URL.revokeObjectURL(url);
        }
        this.invoiceDownloading = false;
        this.toastr.success('Invoice downloaded successfully!');
      },
      error: () => {
        this.invoiceDownloading = false;
        this.toastr.error('Failed to download invoice');
      }
    });
  }

  goToMyBookings(): void {
    this.router.navigate(['/booking/my-bookings']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
