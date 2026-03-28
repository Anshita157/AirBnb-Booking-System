import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Payment,
  PaymentRequest,
  PaymentResponse,
  PaymentVerificationRequest,
  PaymentHistory,
  Invoice,
  Refund,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Create payment
   */
  createPayment(paymentData: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(
      `${this.apiUrl}${environment.endpoints.payments.create}`,
      paymentData
    );
  }

  /**
   * Verify payment
   */
  verifyPayment(data: PaymentVerificationRequest): Observable<Payment> {
    return this.http.post<Payment>(
      `${this.apiUrl}${environment.endpoints.payments.verify}`,
      data
    );
  }

  /**
   * Get payment history
   */
  getPaymentHistory(): Observable<PaymentHistory> {
    return this.http.get<PaymentHistory>(
      `${this.apiUrl}${environment.endpoints.payments.history}`
    );
  }

  /**
   * Get payment by ID
   */
  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(
      `${this.apiUrl}/payments/${id}`
    );
  }

  /**
   * Request refund
   */
  requestRefund(paymentId: string, reason: string): Observable<Refund> {
    return this.http.post<Refund>(
      `${this.apiUrl}${environment.endpoints.payments.refund.replace(':id', paymentId)}`,
      { reason }
    );
  }

  /**
   * Get invoice
   */
  getInvoice(paymentId: string): Observable<Invoice> {
    return this.http.get<Invoice>(
      `${this.apiUrl}/invoices/${paymentId}`
    );
  }

  /**
   * Download invoice
   */
  downloadInvoice(invoiceId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
  }

  /**
   * Process payment for booking
   */
  processBookingPayment(bookingId: string, paymentData: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(
      `${this.apiUrl}/bookings/${bookingId}/payment`,
      paymentData
    );
  }
}
