import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduledServiceProvider } from 'src/app/models/scheduled-service-provider.model';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { ServiceProviderManagerService } from 'src/app/services/service-provider-manager.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  serviceProvider:ScheduledServiceProvider;
  type:string;
  date:string;
  private _serviceProviderId = -1;
 
  constructor(private _serviceProviderManager:ServiceProviderManagerService,private _activatedRoute:ActivatedRoute) {
    this.serviceProvider = new ScheduledServiceProvider(
      new ServiceProviderModel(),
      []
    )
   }

  ngOnInit() {
    if(this._activatedRoute.snapshot.paramMap.has("serviceProviderId")){
      this._serviceProviderId = parseInt(this._activatedRoute.snapshot.paramMap.get("serviceProviderId"))
    }
    if(this._serviceProviderId!==-1)
    {
      this._serviceProviderManager.getServiceProvider(this._serviceProviderId)
      .then(serviceProvider=>{
        this.serviceProvider = serviceProvider;
      })
    }
  }

  calendarDateChange(event)
  {
    console.log(event);
  }

}
