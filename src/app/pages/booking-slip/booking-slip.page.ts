import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingModel } from 'src/app/models/booking.model';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { ServiceModel } from 'src/app/models/service.model';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { ServiceManagerService } from 'src/app/services/service-manager.service';
import { ServiceProviderManagerService } from 'src/app/services/service-provider-manager.service';

@Component({
  selector: 'app-booking-slip',
  templateUrl: './booking-slip.page.html',
  styleUrls: ['./booking-slip.page.scss'],
})
export class BookingSlipPage implements OnInit {

  bookings:BookingModel[] = [];
  bookingInfo:{bookedServiceProvider:ServiceProviderModel,bookedService:ServiceModel,booking:BookingModel}[]=[];
  constructor(
    private _route:ActivatedRoute,
    private _serviceManager:ServiceManagerService,
    private _serviceProviderManager :ServiceProviderManagerService,
    public _configService:ConfigurationManagerService
  ) { }

  ngOnInit() {
   this.bookings = JSON.parse(localStorage.getItem('bookings'));
   localStorage.removeItem('bookings');
   this.bookings.forEach(booking=>{
    Promise.all([ this._serviceManager.getService(booking.serviceId),this._serviceProviderManager.getServiceProvider(booking.serviceProviderId)])
    .then(responses=>{
      let service =responses[0];
      let sProvider = responses[1];
      this.bookingInfo.push({booking,bookedService:service,bookedServiceProvider:sProvider})
     
    }).finally(()=>this._configService.hideSpinner());
   })
  }

}
