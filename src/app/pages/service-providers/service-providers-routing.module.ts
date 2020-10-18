import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';

import { ServiceProvidersPage } from './service-providers.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProvidersPage
  },
  {
    path: ':serviceProviderId/schedule',
    component: ScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProvidersPageRoutingModule {}
