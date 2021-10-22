import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationManagerService {
  
  env:string = "prod";
   _showSpinner:boolean = false;
   primaryColor="#31304F";
  
   clientAppHost = "https://skipqzclient.growthlytix.co.za"
  constructor() { }

  get serviceHost(){
    return this.env==="dev"?"https://localhost:44384":"https://skipqzapi.growthlytix.co.za";
  }

  get userName(){
    return localStorage.getItem('userName');
  }
  
  formatDate(dateString:string)
  {
     let datePattern = /\d{4}\-\d{1,2}\-\d{1,2}/;
     if(datePattern.test(dateString))
     {
       let dateParts = dateString.split("-").map(str=>parseInt(str));
       return Intl.DateTimeFormat("en-GB",{month:"short",year:"numeric",day:"numeric"}).format(new Date(dateParts[0],dateParts[1],dateParts[2]))
     }
     else
     {
       return "";
     }
  }

  formatNumber(num:number){
    return Intl.NumberFormat("en-US",{maximumFractionDigits:2}).format(num)
  }

  get spinnerState(){
    return this._showSpinner;
  }

  showSpinner()
  {
    this._showSpinner =true;
  }

  hideSpinner(){
    this._showSpinner =false;
  }

  generateVC(){
    let generatedNums = [];
    let startIndex =0;
    let codeLength =5;
    while(startIndex<codeLength){
         generatedNums.push(Math.floor(Math.random()*10));
         startIndex+=1;
    }

    return generatedNums.map(num=>num.toString()).join("");
}
}
