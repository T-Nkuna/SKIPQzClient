import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceManagerService } from 'src/app/services/service-manager.service';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.page.html',
  styleUrls: ['./service-providers.page.scss'],
})
export class ServiceProvidersPage implements OnInit {
   private _serviceId:number;
  constructor(private _activatedRoute:ActivatedRoute, private _serviceManager:ServiceManagerService) { }

  ngOnInit() {
    this._serviceId  = this._activatedRoute.snapshot.paramMap.has("serviceId")?parseInt(this._activatedRoute.snapshot.paramMap
    .get("serviceId")):-1;
    this._serviceManager.getServiceProviders(this._serviceId,1,100)
    .then(serviceProviders=>{
      console.log(serviceProviders);
    })
  }

}
