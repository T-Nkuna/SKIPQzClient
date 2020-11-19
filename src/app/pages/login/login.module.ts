import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoginComponent } from 'src/app/components/login/login.component';
import { LoginService } from 'src/app/services/login.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';
import { UserRegistrationComponent } from 'src/app/components/user-registration/user-registration.component';
import { UpateUserPasswordComponent } from 'src/app/components/upate-user-password/upate-user-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage,LoginComponent,LogoComponent,LoginFormComponent,UserRegistrationComponent,UpateUserPasswordComponent],
  providers:[LoginService]
})
export class LoginPageModule {}
