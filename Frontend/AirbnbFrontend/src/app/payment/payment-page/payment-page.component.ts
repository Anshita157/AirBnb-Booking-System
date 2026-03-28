import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../core/services/payment.service';
import { BookingService } from '../../core/services/booking.service';
import { Payment, PaymentRequest } from '../../core/models/payment.model';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup;
  selectedMethod = 'card';
  loading = false;
  bookingId: string = '';
  bookingAmount: number = 0;
  showCardDetails = false;
  showUPIDetails = false;
  showBankDetails = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', Validators.required],
      cardNumber: ['', [Validators.minLength(13), Validators.maxLength(19)]],
      cardHolder: ['', Validators.minLength(2)],
      expiryDate: ['', Validators.pattern(/^\d{2}\/\d{2}$/)],
      cvv: ['', [Validators.minLength(3), Validators.maxLength(4)]],
      upiId: ['', Validators.pattern(/^[\w\.\-]+@[\w\.\-]{2,}$/)],
      accountNumber: ['', Validators.minLength(10)],
      ifscCode: ['', Validators.pattern(/^[A-Z0-9]{11}$/)],
      bankName: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['bookingId'] || '';
      this.bookingAmount = params['amount'] || 0;
    });
  }

  onMethodChange(method: string): void {
    this.selectedMethod = method;
    this.showCardDetails = method === 'card';
    this.showUPIDetails = method === 'upi';
    this.showBankDetails = method === 'bank';
    this.paymentForm.get('paymentMethod')?.setValue(method);
  }

  getCardNumberFormatted(): string {
    const cardNumber = this.paymentForm.get('cardNumber')?.value || '';
    return cardNumber.slice(-4).padStart(cardNumber.length, '*');
  }

  processPayment(): void {
    if (!this.paymentForm.valid) {
      this.toastr.error('Please fill all required fields correctly');
      return;
    }

    this.loading = true;
    const paymentRequest: PaymentRequest = {
      bookingId: this.bookingId,
      amount: this.bookingAmount,
      method: this.selectedMethod as any,
      transactionId: 'TXN' + Date.now(),
      metadata: {
        paymentMethod: this.selectedMethod,
        timestamp: new Date().toISOString()
      }
    };

    this.paymentService.createPayment(paymentRequest).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.toastr.success('Payment processed successfully!');
        this.router.navigate(['/payment/success'], {
          queryParams: { 
            paymentId: response.paymentId || response.id, 
            bookingId: this.bookingId,
            amount: this.bookingAmount
          }
        });
      },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error(error.message || 'Payment processing failed');
        this.router.navigate(['/payment/failed'], {
          queryParams: { 
            bookingId: this.bookingId,
            reason: error.message
          }
        });
      }
    });
  }
}
