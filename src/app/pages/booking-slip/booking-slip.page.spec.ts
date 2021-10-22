import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingSlipPage } from './booking-slip.page';

describe('BookingSlipPage', () => {
  let component: BookingSlipPage;
  let fixture: ComponentFixture<BookingSlipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSlipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSlipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
