import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProvidersPageRoutingModule } from './service-providers-routing.module';

import { ServiceProvidersPage } from './service-providers.page';
import {CalendarModule} from 'ion2-calendar';
import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceProvidersPageRoutingModule,
    CalendarModule
  ],
  declarations: [ServiceProvidersPage,ScheduleComponent]
})
export class ServiceProvidersPageModule {}
