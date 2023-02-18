import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiimsRegistrationStepTwoComponent } from './aiims-registration-step-two.component';

describe('AiimsRegistrationStepTwoComponent', () => {
  let component: AiimsRegistrationStepTwoComponent;
  let fixture: ComponentFixture<AiimsRegistrationStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiimsRegistrationStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiimsRegistrationStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
