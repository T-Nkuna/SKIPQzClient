import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraModel } from 'src/app/models/extra.model';
import { SelectableExtraModel } from 'src/app/models/selectable-extra.model';
import { ExtraManagerService } from 'src/app/services/extra-manager.service';

@Component({
  selector: 'app-service-extras',
  templateUrl: './service-extras.component.html',
  styleUrls: ['./service-extras.component.scss'],
})
export class ServiceExtrasComponent implements OnInit {

  extras:SelectableExtraModel[] =[];
  serviceId:number = 0;
  serviceProviderId:number=0;
  selectedExtras:ExtraModel[] = [];
  startTimeSlot:string ="";
  bookedDate:string="";
  constructor(private _extraManager:ExtraManagerService,private _activatedRoute:ActivatedRoute,private _router:Router) { }

  ngOnInit() {
    let paramMap = this._activatedRoute.snapshot.paramMap;
    if(paramMap.has("serviceId"))
    {
      this.serviceId = parseInt(paramMap.get("serviceId"));
    }

    if(paramMap.has("serviceProviderId"))
    {
      this.serviceProviderId = parseInt(paramMap.get("serviceProviderId"));
    }

    if(paramMap.has("startTimeSlot"))
    {
      this.startTimeSlot = paramMap.get("startTimeSlot");
    }

    if(paramMap.has("bookedDate"))
    {
      this.bookedDate = paramMap.get("bookedDate");
    }
    this._extraManager.getServiceExtras(this.serviceId)
    .then(extras=>{
      this.extras=extras.map(ex=>({...ex,isSelected:false}));
    });
  }

  extraSelected(event,extra:SelectableExtraModel){
      if(extra.isSelected && !this.selectedExtras.includes(extra)){
        this.selectedExtras.push(extra);
      }
      else if(!extra.isSelected)
      {
        this.selectedExtras = this.selectedExtras.filter(ex=>ex.extraId!==extra.extraId);
      }
  }

  continueClicked = ()=>{
    this._router.navigate([
      "/services/book",
      this.serviceId,
      this.serviceProviderId,
      {
        bookedDate:this.bookedDate,
        extrasCost:this.selectedExtras.reduce((c,n)=>c+n.cost,0),
        bookedTime:this.startTimeSlot
      }])
  }

}
