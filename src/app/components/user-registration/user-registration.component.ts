import { Component, OnInit } from '@angular/core';

import { FormField } from 'src/app/models/FormField';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { Config } from './config';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  formFields: FormField[] = [];
   config:Config;
  constructor(
    public _configurationService:ConfigurationManagerService,
    private _router:Router,
    private _accountService:AccountService,
    private _alertController:AlertController
  ) {
    this.config = new Config();
    this.formFields = this.config.formFields;

   }

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
   let submittedRec = this.config.backEndModel;

    this._configurationService.showSpinner();
    this._accountService.createAccount(submittedRec)
    .then(response=>{
      this._alertController.create({message:response.message,header:"Registration", buttons:[{text:"Ok",handler:()=>{
        this._router.navigate(["/login"]);
    }}]}).then((alert)=>{
      alert.present();
    });
    }).finally(()=>{
      this._configurationService.hideSpinner();
    })
    
  }

}
