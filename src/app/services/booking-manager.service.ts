import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactDetail } from '../components/contact-details/contact-details.component';
import { SysResult } from '../interfaces/core.interface';
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

  bookingsPerUser(){
    return this._httpClient.get<BookingModel[]>(`${this.serviceUrl}/UserBookings?userName=${this._configService.userName}`)
    .toPromise()
    .catch(err=>this.reportError(err,<BookingModel[]>[]));
  }

  cancelUserBooking(userName: string,bookingId:number){
    return this._httpClient.post<SysResult<number>>(`${this.serviceUrl}/CancelUserBooking`,{userName,bookingId})
              .toPromise()
              .catch(err=>this.reportError(err,<SysResult<number>>{message:"Unkown Error Occured",data:0,ok:false}))
  }
}
