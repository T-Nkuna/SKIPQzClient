import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduledServiceProvider } from '../models/scheduled-service-provider.model';
import { ConfigurationManagerService } from './configuration-manager.service';
import { JournalingService } from './journaling.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderManagerService extends JournalingService {

  serviceUrl = "";
  constructor(private _configManager:ConfigurationManagerService,private _httpClient:HttpClient) { 
    super();
    this.serviceUrl = `${this._configManager.serviceHost}/api/serviceprovider`;
  }

  getServiceProvider(serviceProviderId:number)
  {
    return this._httpClient.get<ScheduledServiceProvider>(`${this.serviceUrl}/${serviceProviderId}`)
            .toPromise();
  }
}
