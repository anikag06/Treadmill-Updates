import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiimsRegistrationStepThreeComponent } from './aiims-registration-step-three.component';

describe('AiimsRegistrationStepThreeComponent', () => {
  let component: AiimsRegistrationStepThreeComponent;
  let fixture: ComponentFixture<AiimsRegistrationStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiimsRegistrationStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiimsRegistrationStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
