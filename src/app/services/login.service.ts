import { Injectable } from '@angular/core';
import { Credentials} from '../models/Credentials';
import {HttpClient} from '@angular/common/http';

import { ConfigurationManagerService } from './configuration-manager.service';
import { JournalingService } from './journaling.service';
@Injectable()
export class LoginService extends JournalingService {

  loginServiceUrl = "";
  constructor(private _httpClient:HttpClient,private _configService:ConfigurationManagerService) { 
    super();
    this.loginServiceUrl = `${this._configService.serviceHost}/oauth`;
  }

  logUserIn(credentials:Credentials){
    let fData = new FormData();
    fData.append("username",credentials.username);
    fData.append("password",credentials.password);

    return this._httpClient.post<any>(this.loginServiceUrl,fData).toPromise();
  }

 registerUser(options){
    let formData = new FormData();
    formData.append("methodName","LoginService->registerAccount");
    formData.append("parameters",JSON.stringify(options));
    return this._httpClient.post<any>(this.loginServiceUrl,formData).toPromise();
  }

  sendVC(email:string,code:string){
    let formData = new FormData();
    formData.append("methodName","LoginService->sendVC");
    formData.append("parameters",JSON.stringify({email,code}));
    return this._httpClient.post<any>(this.loginServiceUrl,formData).toPromise();
  }

  updatePassword(password:string,confirmPassword:string,email:string){
    let formData = new FormData();
    formData.append("methodName","LoginService->updateUserPassword");
    formData.append("parameters",JSON.stringify({password,confirmPassword,email}));
    return this._httpClient.post<any>(this.loginServiceUrl,formData).toPromise();
  }
}
