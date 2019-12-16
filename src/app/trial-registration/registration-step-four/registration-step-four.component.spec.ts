import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStepFourComponent } from './registration-step-four.component';

describe('RegistrationStepFourComponent', () => {
  let component: RegistrationStepFourComponent;
  let fixture: ComponentFixture<RegistrationStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
