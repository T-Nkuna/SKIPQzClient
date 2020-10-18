import { TestBed } from '@angular/core/testing';

import { ServiceProviderManagerService } from './service-provider-manager.service';

describe('ServiceProviderManagerService', () => {
  let service: ServiceProviderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProviderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
