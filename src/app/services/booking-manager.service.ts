import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactDetail } from '../components/contact-details/contact-details.component';
import { BookingModel } from '../models/booking.model';
import { ConfigurationManagerService } from './configuration-manager.service';
import { JournalingService } from './journaling.service';

@Injectable({
  providedIn: 'root'
})
export class BookingManagerService extends JournalingService {

  serviceUrl:string = "";
  constructor(private _configService:ConfigurationManagerService,private _httpClient:HttpClient) { 
    super();
    this.serviceUrl =`${this._configService.serviceHost}/api/booking`;
  }

  addBooking(booking:BookingModel)
  {
     return this._httpClient.post<BookingModel>(this.serviceUrl,booking)
     .toPromise()
     .catch(err=>this.reportError(err,new BookingModel(new ContactDetail())));
  }
}
