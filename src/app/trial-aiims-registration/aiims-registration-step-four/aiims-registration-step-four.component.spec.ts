import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiimsRegistrationStepFourComponent } from './aiims-registration-step-four.component';

describe('AiimsRegistrationStepFourComponent', () => {
  let component: AiimsRegistrationStepFourComponent;
  let fixture: ComponentFixture<AiimsRegistrationStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiimsRegistrationStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiimsRegistrationStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
