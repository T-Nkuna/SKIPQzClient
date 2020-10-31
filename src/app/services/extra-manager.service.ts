import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExtraModel } from '../models/extra.model';
import { ConfigurationManagerService } from './configuration-manager.service';
import { JournalingService } from './journaling.service';

@Injectable({
  providedIn: 'root'
})
export class ExtraManagerService extends JournalingService {
  
  serviceUrl:string;
  constructor(private _httpClient:HttpClient,private _configService:ConfigurationManagerService) { 
    super();
    this.serviceUrl =`${this,_configService.serviceHost}/api/extra`;
  }

  public getServiceExtras(serviceId:number)
  {
    return this._httpClient.get<Array<ExtraModel>>(`${this.serviceUrl}/serviceExtras/${serviceId}`)
    .toPromise()
    .catch(err=>this.reportError(err,new Array<ExtraModel>()));
  }
}
