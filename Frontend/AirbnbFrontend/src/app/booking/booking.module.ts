import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';


@NgModule({
  declarations: [
    BookingPageComponent,
    BookingSummaryComponent,
    MyBookingsComponent,
    BookingHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
