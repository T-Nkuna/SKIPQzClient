import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/models/FormField';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-upate-user-password',
  templateUrl: './upate-user-password.component.html',
  styleUrls: ['./upate-user-password.component.css']
})
export class UpateUserPasswordComponent implements OnInit {
   verificationCodeField:FormField = {
     name:"Enter Code",
     value:"",
     tagName:"input",
     type:"text",
     required:true
   };
   emailField:FormField ={name:"Email",
   value:"",
   tagName:"input",
   type:"text",
   required:true
 };
   passwordFields:FormField[] =[
    {
      name:"Password",
      value:"",
      tagName:"input",
      type:"password",
      required:true
    },
    {
      name:"Confirm Password",
      value:"",
      tagName:"input",
      type:"password",
      required:true
    }
   ];

   generatedVC:string;
  constructor(
    private _configurationService:ConfigurationManagerService,
    private _loginService:LoginService,
    private _alertController:AlertController,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  sendVC(emailAddress:string){
    this.generatedVC = this._configurationService.generateVC();
    this._configurationService.showSpinner();
    this._loginService.sendVC(emailAddress,this.generatedVC)
    .then(response=>{
      console.log(response);
    })
   .finally(()=>{
      this._configurationService.hideSpinner();
    })
  }

  updatePassword(){
    this._configurationService.showSpinner();
    this._loginService.updatePassword(
      this.passwordFields[0].value,
      this.passwordFields[1].value,
      this.emailField.value
    ).then((response)=>{
      if(response.message=="Password Updated"){
        /* let snackBarRef = this._snackBar.open(response.message,"Login");
       snackBarRef.onAction().subscribe(()=>{
         this._router.navigate(['/login'])
       })*/
      }
      else
      {
        //this._snackBar.open(response.message,"Dismiss");
      }
     
    })
    .finally(()=>{
      this._configurationService.hideSpinner();
    })
  }

}
