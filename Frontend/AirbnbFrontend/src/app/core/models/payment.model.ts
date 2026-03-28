export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  orderId?: string;
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
}

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  currency?: string;
  method: PaymentMethod;
  paymentMethod?: string;
  transactionId?: string;
  metadata?: any;
  cardDetails?: CardDetails;
  upiId?: string;
  bankDetails?: BankDetails;
}

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface PaymentResponse {
  id?: string;
  paymentId: string;
  status: PaymentStatus;
  message: string;
  transactionId?: string;
  redirectUrl?: string;
}

export interface PaymentVerificationRequest {
  paymentId: string;
  transactionId: string;
  signature?: string;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  payments: Payment[];
  totalAmount: number;
  totalPayments: number;
}

export interface Invoice {
  id: string;
  bookingId: string;
  paymentId: string;
  invoiceNumber: string;
  date: Date;
  dueDate?: Date;
  amount: number;
  tax?: number;
  discount?: number;
  totalAmount: number;
  items: InvoiceItem[];
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Refund {
  id: string;
  paymentId: string;
  bookingId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'processed' | 'failed';
  requestedAt: Date;
  processedAt?: Date;
}
