import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceProvidersPage } from './service-providers.page';

describe('ServiceProvidersPage', () => {
  let component: ServiceProvidersPage;
  let fixture: ComponentFixture<ServiceProvidersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProvidersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceProvidersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
