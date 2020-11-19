import { Component, OnInit } from '@angular/core';

import { FormField } from 'src/app/models/FormField';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  formFields: FormField[] = [
    {name:"Name",tagName:"input",type:"text",value:"",required:true},
    {name:"Surname",tagName:"input",type:"text",value:"",required:true},
    {name:"Id No",tagName:"input",type:"text",value:"",required:true},
    {name:"Email",tagName:"input",type:"email",value:"",required:true},
    {name:"Contact No",tagName:"input",type:"text",value:"",required:true},
    {name:"Password", tagName:"input",type:"password",value:"",required:true},
    {name:"Confirm Password",tagName:"input",type:"password",value:"",required:true}
  ];
  constructor(
    public _configurationService:ConfigurationManagerService,
    private _router:Router,
    private _loginService:LoginService,
    private _alertController:AlertController
  ) { }

  ngOnInit(): void {
  }

  loginClicked(){
    this._router.navigate(['/login']);
  }

  registerClicked(formEle:NgForm){
   if(formEle.invalid){
     return;
   }
   let formValue = formEle.value;
   let submittedRec = Object.keys(formValue)
    .map(key=>{
      return (key[0].toLowerCase()+key.substring(1,key.length)).replace(/\s+/g,'');
    }).map((prop,index)=>{
      
      return ({[prop]:Object.values(formValue)[index]});
    }).reduce((carry,next)=>{
        return Object.assign({},carry,next);
    },{});
    submittedRec["registerAs"] =1;

    this._configurationService.showSpinner();
    this._loginService.registerUser(
      { "header":submittedRec})
      .then(response=>{
          
      }).finally(()=>{
        this._configurationService.hideSpinner();
      })
    
  }

}
