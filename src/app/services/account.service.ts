import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientInfoCreateDTO } from '../interfaces/account.interface';
import { SysResult } from '../interfaces/core.interface';
import { Credentials } from '../models/Credentials';
import { ConfigurationManagerService } from './configuration-manager.service';
import { JournalingService } from './journaling.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService  extends JournalingService{
  serviceUrl:string = "";
  constructor(private _configService:ConfigurationManagerService, private _httpClient:HttpClient) {
    super();
    this.serviceUrl =`${this._configService.serviceHost}/api/account`;
   }

   public createAccount(accountDetails:ClientInfoCreateDTO){
     let formData = new FormData();
     Object.keys(accountDetails).forEach(propName=>formData.append(propName,accountDetails[propName]));
     return this._httpClient.post<SysResult<boolean>>(`${this.serviceUrl}`,formData)
            .toPromise()
            .catch(err=>this.reportError(err,<SysResult<boolean>>{data:false,message:"Unkown Error Occured",ok:false}));
   }

   public signIn(loginInfo:Credentials){
      let formData = new FormData();
      formData.append("userName",loginInfo.username);
      formData.append("password",loginInfo.password);
      return this._httpClient.post(`${this.serviceUrl}/signIn`,formData)
      .toPromise()
      .catch(err=>this.reportError(err,false));
   }
}
