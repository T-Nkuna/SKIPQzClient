import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpateUserPasswordComponent } from './upate-user-password.component';

describe('UpateUserPasswordComponent', () => {
  let component: UpateUserPasswordComponent;
  let fixture: ComponentFixture<UpateUserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpateUserPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpateUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
