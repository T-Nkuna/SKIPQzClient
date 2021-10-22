import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {FormField} from '../../models/FormField';
import {LoginService} from '../../services/login.service';
import {Credentials} from '../../models/Credentials';
import { AlertController } from '@ionic/angular';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router:Router, 
    private _accountService:AccountService,
    private _configurationService:ConfigurationManagerService,
    private _activatedRoute:ActivatedRoute,
    private _alertContoller:AlertController
    ) {
       
     }

  ngOnInit(): void {
   /* let userInfo= this._configurationService.userInfo;
    if(userInfo && parseInt(userInfo.currentUserRoleId)==1){
     
    }*/
    if(!!this._configurationService.userName){
      this._router.navigate(['/services']);
    }
  }

  loginButtonClicked(formFields:FormField[]){
     //submit formFields to service
     let credentials = formFields.map(f=>f.value);
     this._configurationService.showSpinner();
     this._accountService.signIn(new Credentials(credentials[0],credentials[1]))
     .then(res=>{
     
       if(res.ok){
         localStorage.setItem('userName',res.data);
        this._router.navigate(['/services']);
         /* this._configurationService.setCurrentUserInfo(<UserInfo>res.responseJSON.currentUserInfo);
          this._router.navigate(['/search']);*/  
          
       }
       else
       {
         this._alertContoller.create({message:"Invalid Credentials",buttons:["Dismiss"]})
         .then(alertElement=>{
           alertElement.present();
         });//.open("Invalid Credentials","Dismiss");
       }
       
     }).finally(()=>{
      this._configurationService.hideSpinner();
     })
    //
  }

  registerButtonClicked(){
    this._router.navigate(['/login/register']);
  }

}
