import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';
import { ServiceExtrasComponent } from 'src/app/components/service-extras/service-extras.component';
import { BookingCardComponent } from 'src/app/components/booking-card/booking-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule
  ],
  declarations: [ServicesPage,ServiceExtrasComponent,BookingCardComponent]
})
export class ServicesPageModule {}
