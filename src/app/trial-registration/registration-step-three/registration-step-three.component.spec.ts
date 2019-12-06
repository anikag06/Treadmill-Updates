import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStepThreeComponent } from './registration-step-three.component';

describe('RegistrationStepThreeComponent', () => {
  let component: RegistrationStepThreeComponent;
  let fixture: ComponentFixture<RegistrationStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
