import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'booking-page', pathMatch: 'full' },
  { path: 'booking-page', component: BookingPageComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'history', component: BookingHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
