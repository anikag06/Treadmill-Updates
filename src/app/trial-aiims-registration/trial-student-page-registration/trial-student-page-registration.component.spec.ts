import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialStudentPageRegistrationComponent } from './trial-student-page-registration.component';

describe('TrialStudentPageRegistrationComponent', () => {
  let component: TrialStudentPageRegistrationComponent;
  let fixture: ComponentFixture<TrialStudentPageRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialStudentPageRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialStudentPageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
