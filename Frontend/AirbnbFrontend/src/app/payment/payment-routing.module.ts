import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';

const routes: Routes = [
  { path: '', component: PaymentPageComponent },
  { path: 'payment-page', component: PaymentPageComponent },
  { path: 'success', component: PaymentSuccessComponent },
  { path: 'failed', component: PaymentFailedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
