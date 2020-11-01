import { TestBed } from '@angular/core/testing';

import { BookingManagerService } from './booking-manager.service';

describe('BookingManagerService', () => {
  let service: BookingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
