import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpateUserPasswordComponent } from 'src/app/components/upate-user-password/upate-user-password.component';
import { UserRegistrationComponent } from 'src/app/components/user-registration/user-registration.component';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path:"register",
    component:UserRegistrationComponent
  },
  {
    path:"forgotPassword",
    component:UpateUserPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
