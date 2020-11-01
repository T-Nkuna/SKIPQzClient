
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingCardComponent } from 'src/app/components/booking-card/booking-card.component';
import { ServiceExtrasComponent } from 'src/app/components/service-extras/service-extras.component';

import { ServicesPage } from './services.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage
  },
  {
    path:"serviceExtras/:serviceId",
    component:ServiceExtrasComponent
  },
  {
    path:"book",
    component:BookingCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}
