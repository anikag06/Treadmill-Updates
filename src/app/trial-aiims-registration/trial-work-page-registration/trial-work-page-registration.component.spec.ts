import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialWorkPageRegistrationComponent } from './trial-work-page-registration.component';

describe('TrialWorkPageRegistrationComponent', () => {
  let component: TrialWorkPageRegistrationComponent;
  let fixture: ComponentFixture<TrialWorkPageRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialWorkPageRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialWorkPageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
