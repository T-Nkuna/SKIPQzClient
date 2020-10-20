import { Component, Input, OnInit } from '@angular/core';
import { ServiceModel } from 'src/app/models/service.model';
import { ConfigurationManagerService } from 'src/app/services/configuration-manager.service';
import { ServiceManagerService } from 'src/app/services/service-manager.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  @Input() services:Array<ServiceModel> = [];
  constructor(private _serviceManager:ServiceManagerService, public configManager:ConfigurationManagerService) { 
  }

  ngOnInit() {
    this._serviceManager.getServices(1,50)
    .then(services=>{
      this.services = services;
    })
  }

}
