import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduledServiceProvider } from '../models/scheduled-service-provider.model';
import { ServiceProviderModel } from '../models/service-provider.model';
import { ServiceModel } from '../models/service.model';
import { ConfigurationManagerService } from './configuration-manager.service';
import { JournalingService } from './journaling.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagerService extends JournalingService{

  serviceUrl = "";
  constructor(private _httpClient:HttpClient, private _configManager:ConfigurationManagerService) {
    super();
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

   public getService(serviceId:number)
   {
     return this._httpClient.get<ServiceModel>(`${this.serviceUrl}/${serviceId}`)
                .toPromise()
                .catch(err=>this.reportError(err,new ServiceModel("",0,0)))
   }
}
