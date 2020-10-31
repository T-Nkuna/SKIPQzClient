import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduledServiceProvider } from 'src/app/models/scheduled-service-provider.model';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { ServiceManagerService } from 'src/app/services/service-manager.service';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.page.html',
  styleUrls: ['./service-providers.page.scss'],
})
export class ServiceProvidersPage implements OnInit {
   private _serviceId:number;
   serviceProviders:Array<ScheduledServiceProvider> = [];
   
  constructor(private _activatedRoute:ActivatedRoute, private _serviceManager:ServiceManagerService, public configManager:ConfigurationManagerService
  ) { }

  ngOnInit() {
    this._serviceId  = this._activatedRoute.snapshot.paramMap.has("serviceId")?parseInt(this._activatedRoute.snapshot.paramMap
    .get("serviceId")):-1;
    this.configManager.showSpinner();
    this._serviceManager.getServiceProviders(this._serviceId,1,100)
    .then(serviceProviders=>{
      this.serviceProviders = serviceProviders;
    }).finally(()=>this.configManager.hideSpinner());
  }

}
