import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSlipPageRoutingModule } from './booking-slip-routing.module';

import { BookingSlipPage } from './booking-slip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSlipPageRoutingModule,
  ],
  declarations: [BookingSlipPage]
})
export class BookingSlipPageModule {}
