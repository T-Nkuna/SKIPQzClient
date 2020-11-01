import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BookingModel } from 'src/app/models/booking.model';
import { ScheduledServiceProvider } from 'src/app/models/scheduled-service-provider.model';
import { ServiceProviderModel } from 'src/app/models/service-provider.model';
import { ServiceModel } from 'src/app/models/service.model';
import { BookingManagerService } from 'src/app/services/booking-manager.service';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { ServiceManagerService } from 'src/app/services/service-manager.service';
import { ServiceProviderManagerService } from 'src/app/services/service-provider-manager.service';
import { ContactDetail, ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
})
export class BookingCardComponent implements OnInit {

  bookedServiceProvider:ScheduledServiceProvider = new ScheduledServiceProvider(new ServiceProviderModel(),[]);
  bookedService:ServiceModel = new ServiceModel("",0,0);
  extrasCost:number;
  cost:number=0;

  @Input() booking:BookingModel = new BookingModel(new ContactDetail());
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _serviceManager:ServiceManagerService,
    private _serviceProviderManager:ServiceProviderManagerService,
    private _configService:ConfigurationManagerService,
    private _modalController:ModalController,
    private _bookingManager:BookingManagerService,
    private _alertController:AlertController,
    private _router:Router
  ) { }
  
  ngOnInit() {
    let paramMap = this._activatedRoute.snapshot.paramMap;
     this.booking.serviceId = paramMap.has("serviceId")? parseInt(paramMap.get("serviceId")):this.booking.serviceId;
     this.booking.serviceProviderId =paramMap.has("serviceProviderId")? parseInt(paramMap.get("serviceProviderId")):this.booking.serviceProviderId;
     this.booking.bookedDate = paramMap.has("bookedDate")? paramMap.get("bookedDate"):this.booking.bookedDate;
     this.extrasCost = paramMap.has("extrasCost")? parseFloat(paramMap.get("extrasCost")):0;
     this.booking.startTimeSlot = paramMap.has("bookedTime")? paramMap.get("bookedTime"):this.booking.startTimeSlot;
     this.booking.bookedDate = paramMap.has("bookedDate")? paramMap.get("bookedDate"):this.booking.bookedDate;
     this.booking.extraIds = paramMap.has("extraIds")?paramMap.get("extraIds").split(",").filter(str=>!!str).map(str=>parseInt(str.trim())):this.booking.extraIds;
     this._configService.showSpinner();
     Promise.all([ this._serviceManager.getService(this.booking.serviceId),this._serviceProviderManager.getServiceProvider(this.booking.serviceProviderId)])
     .then(responses=>{
       let service =responses[0];
       let sProvider = responses[1];
      this.bookedService=service;
      this.cost = this.bookedService.cost+this.extrasCost;
      this.bookedServiceProvider=sProvider;
     }).finally(()=>this._configService.hideSpinner());
     
  }

  formatDate(dateString:string)
  {
    return this._configService.formatDate(dateString);
  }

  formatNumber(number:number)
  {
    return this._configService.formatNumber(number);
  }

   bookClicked= async ()=>
  {
     let modal = await this._modalController.create({component:ContactDetailsComponent,id:"contactDetailsModal",componentProps:{modalId:"contactDetailsModal"}});
     modal.onWillDismiss<ContactDetail>()
     .then(event=>{
       if(event.data){
         //submitted booking data and contactDetails to server
         //and then navigate to success page
         
         this.booking.contactEmail = event.data.email;
         this.booking.contactName = event.data.name;
         this.booking.contactNo= event.data.contactNo;
         this._configService.showSpinner();
         this._bookingManager.addBooking(this.booking)
         .then(newBooking=>{
           
            let options:{header:string;message:string} = {header:"",message:""};
            if(newBooking?.bookingId>0??false)
            {
               
              options.header ="Booking Created";
              options.message = "Your Reference No. is "+newBooking.bookingId;
            }
            else
            {
              options.header ="Booking Failed to Create";
              options.message = "Unkown Error Occured !"
            }   
            this._alertController.create({
              ...options,
              buttons:[{text:"Ok",handler:()=>{
                  this._router.navigate(["/services"]);
              }}]
            }).then(alert=>alert.present());  
       

         }).finally(()=>this._configService.hideSpinner())
  
         
       }
     })
     await modal.present();
  }

}
