import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {

  contactDetail = new ContactDetail();
  contactDetailEntries:{key:string,value:string}[];
  @Input() modalId:string;
  constructor(private _modelController:ModalController) { 
    this.contactDetailEntries = this.toEntries();
  }

  ngOnInit() {}

  toEntries(){
    let entries= Object.entries(this.contactDetail).map(entry=>({key:entry[0],value:entry[1]}));
    return entries;
  }

  nameOf(prop:string){
    switch(prop){
      case "name":
        return "Name";
        break;
      case "email":
        return "Email";
        break;
      case "contactNo":
        return "Contact No";
        break;
    }
  }

  contactFormSubmitted(contact:ContactDetail){
    this._modelController.dismiss(contact,"",this.modalId);
  }

  dismissModal(){
    this._modelController.dismiss(null,null,this.modalId);
  }

}

export class ContactDetail
{
    public name:string="";
    public email:string="";
    public contactNo:string="";

    constructor(){}
}
