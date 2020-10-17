import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationManagerService {
  
  env:string = "dev";
  constructor() { }

  get serviceHost(){
    return this.env==="dev"?"https://localhost:44384":"";
  }
}
