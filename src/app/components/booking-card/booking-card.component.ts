import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduledServiceProvider } from 'src/app/models/scheduled-service-provider.model';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { ServiceModel } from 'src/app/models/service.model';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { ServiceManagerService } from 'src/app/services/service-manager.service';
import { ServiceProviderManagerService } from 'src/app/services/service-provider-manager.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {

  serviceId:number;
  serviceProviderId:number;
  bookedServiceProvider:ScheduledServiceProvider = new ScheduledServiceProvider(new ServiceProviderModel(),[]);
  bookedService:ServiceModel = new ServiceModel("",0,0);
  bookedDate:string ="";
  extrasCost:number;
  cost:number=0;
  bookedTime:string = "";
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _serviceManager:ServiceManagerService,
    private _serviceProviderManager:ServiceProviderManagerService,
    private _configService:ConfigurationManagerService
  ) { }
  
  ngOnInit() {
    let paramMap = this._activatedRoute.snapshot.paramMap;
     this.serviceId = parseInt(paramMap.get("serviceId"));
     this.serviceProviderId = parseInt(paramMap.get("serviceProviderId"));
     this.bookedDate = paramMap.get("bookedDate");
     this.extrasCost = parseFloat(paramMap.get("extrasCost"));
     this.bookedTime = paramMap.get("bookedTime");
     this.bookedDate = paramMap.get("bookedDate");
      this._configService.showSpinner();
     Promise.all([ this._serviceManager.getService(this.serviceId),this._serviceProviderManager.getServiceProvider(this.serviceProviderId)])
     .then(responses=>{
       let service =responses[0];
       let sProvider = responses[1];
      this.bookedService=service;
      this.cost = this.bookedService.cost+this.extrasCost;
      this.bookedServiceProvider=sProvider
     }).finally(()=>this._configService.hideSpinner())
     
  }

  formatDate(dateString:string)
  {
    return this._configService.formatDate(dateString);
  }

}
