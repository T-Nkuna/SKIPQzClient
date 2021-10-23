import { ContactDetail } from '../components/contact-details/contact-details.component';

export class BookingModel
{
    public serviceId:number =0;
    public serviceProviderId:number=0;
    public extraIds:number[] =[];
    public bookedDate:string ="";
    public startTimeSlot:string="";
    public contactName:string ="";
    public contactEmail:string="";
    public contactNo:string = "";
    public bookingId:number=0;
    public userName:string='';
    public canCanel = true;
    constructor(contactDetails:ContactDetail){
        this.contactEmail = contactDetails.email,
        this.contactName = contactDetails.name;
        this.contactNo = contactDetails.contactNo;
        this.userName = localStorage.getItem('userName')??'';
    }
}