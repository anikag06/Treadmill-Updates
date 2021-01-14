import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStepOneNextComponent } from './registration-step-one-next.component';

describe('RegistrationStepOneNextComponent', () => {
  let component: RegistrationStepOneNextComponent;
  let fixture: ComponentFixture<RegistrationStepOneNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationStepOneNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStepOneNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
