import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ConfigurationManagerService } from './services/configuration-manager.service';
import { BookingManagerService } from './services/booking-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  sideMenuItems:Array<{text:string;}> = [
    {text:"My Bookings"}
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuControlller:MenuController,
    public configurationManager:ConfigurationManagerService,
    private _bookingService:BookingManagerService,
    private _router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  logout(){
    localStorage.clear();
    window.location.href = this.configurationManager.clientAppHost;
  }
  toggleSideMenu(){

    this.menuControlller.enable(true,"sideMenu");
    this.menuControlller.open("sideMenu");
   
  }

  onMenuItemClick(menuItemText:string){
    switch(menuItemText){
      case 'My Bookings':
        this.configurationManager.showSpinner();
        this._bookingService.bookingsPerUser()
        .then(bookingList=>{
          this.menuControlller.close();
          localStorage.setItem('bookings',JSON.stringify(bookingList));
          this._router.navigate(["/booking-slip"])
        })
        .finally(()=>this.configurationManager.hideSpinner())
    }
  }
}
