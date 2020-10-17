import { Component, Input, OnInit } from '@angular/core';
import { ServiceModel } from 'src/app/models/service.model';
import { ServiceManagerService } from 'src/app/services/service-manager.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  @Input() services:Array<ServiceModel> = [{
    name:"Hair Cut",
    cost:2300,
    duration:30,
    serviceId:1
  }];
  constructor(private _serviceManager:ServiceManagerService) { }

  ngOnInit() {
    this._serviceManager.getServices(1,50)
    .then(services=>{
      this.services = services;
    })
  }

}
