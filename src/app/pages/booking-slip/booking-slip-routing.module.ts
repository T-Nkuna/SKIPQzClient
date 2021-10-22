import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingSlipPage } from './booking-slip.page';

const routes: Routes = [
  {
    path: '',
    component: BookingSlipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSlipPageRoutingModule {}
