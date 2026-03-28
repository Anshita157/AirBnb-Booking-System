import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-hotel', component: AddHotelComponent },
  { path: 'manage-hotels', component: ManageHotelsComponent },
  { path: 'add-room', component: AddRoomComponent },
  { path: 'manage-bookings', component: ManageBookingsComponent },
  { path: 'manage-users', component: ManageUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
