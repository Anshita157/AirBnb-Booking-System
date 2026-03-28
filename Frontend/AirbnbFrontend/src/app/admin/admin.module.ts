import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { ManageHotelsComponent } from './manage-hotels/manage-hotels.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddHotelComponent,
    AddRoomComponent,
    ManageHotelsComponent,
    ManageBookingsComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
