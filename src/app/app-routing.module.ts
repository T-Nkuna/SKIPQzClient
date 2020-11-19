import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: '',
    children:[
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
      },
      {
        path: 'services/:serviceId/providers',
        loadChildren: () => import('./pages/service-providers/service-providers.module').then( m => m.ServiceProvidersPageModule)
      }
    ]
  },{
    path:"**",
    redirectTo:"login",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
