import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduledServiceProvider } from '../models/scheduled-service-provider.model';
import { ServiceProviderModel } from '../models/service-provider.model';
import { ServiceModel } from '../models/service.model';
import { ConfigurationManagerService } from './configuration-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagerService {

  serviceUrl = "";
  constructor(private _httpClient:HttpClient, private _configManager:ConfigurationManagerService) {
    this.serviceUrl = `${this._configManager.serviceHost}/api/service`;
   }

   public getServices(pageNumber:number,pageSize:number)
   {
      return this._httpClient.get<Array<ServiceModel>>(`${this.serviceUrl}?pageIndex=${pageNumber-1}&pageSize=${pageSize}`)
     .toPromise();
   }

   public getServiceProviders(serviceId:number,pageNumber:number,pageSize:number)
   {
     return this._httpClient.get<Array<ScheduledServiceProvider>>(`${this.serviceUrl}/${serviceId}/providers?pageIndex=${pageNumber-1}&pageSize=${pageSize}`)
            .toPromise();
   }
}
