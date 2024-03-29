import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduledServiceProvider } from 'src/app/models/scheduled-service-provider.model';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { Shift } from 'src/app/models/work-day.model';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { ServiceProviderManagerService } from 'src/app/services/service-provider-manager.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  serviceProvider:ScheduledServiceProvider;
  timeSlots:Array<Shift> = [];
  type:string ="js-date";
  date:Date;
  private _serviceProviderId = -1;
  private _serviceId = -1;
  constructor(
    private _serviceProviderManager:ServiceProviderManagerService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router,
    private _configManager:ConfigurationManagerService
    ) {
    this.serviceProvider = new ScheduledServiceProvider(
      new ServiceProviderModel(),
      []
    )
   }

  ngOnInit() {
    if(this._activatedRoute.snapshot.paramMap.has("serviceProviderId")){
      this._serviceProviderId = parseInt(this._activatedRoute.snapshot.paramMap.get("serviceProviderId"))
    }

    if(this._activatedRoute.snapshot.paramMap.has("serviceId"))
    {
      this._serviceId = parseInt(this._activatedRoute.snapshot.paramMap.get("serviceId"));
    }
    if(this._serviceProviderId!==-1)
    {
      this._configManager.showSpinner();
      this._serviceProviderManager.getServiceProvider(this._serviceProviderId)
      .then(serviceProvider=>{
        this.serviceProvider = serviceProvider;
      }).finally(()=>this._configManager.hideSpinner());
    }
  }

  calendarDateChange(selectedDate:Date)
  {

     let scheduledWorkDay = this.serviceProvider.scheduledWorkDays.find(wd=>wd.dayOfWeek==selectedDate.getDay());
     if(scheduledWorkDay)
     {
       this._configManager.showSpinner();
       this._serviceProviderManager.getServiceProviderSchedule(this._serviceProviderId,this._serviceId,selectedDate)
       .then(response=>{
         this.timeSlots = response;
       }).finally(()=>this._configManager.hideSpinner());
     }
     else
     {
       this.timeSlots = [];
     }
  }

  slotSelected =(startTimeSlot:string)=>{
     this._router.navigate(["/services/serviceExtras",this._serviceId,{serviceProviderId:this._serviceProviderId,startTimeSlot,bookedDate:`${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`}]);
  }

}
