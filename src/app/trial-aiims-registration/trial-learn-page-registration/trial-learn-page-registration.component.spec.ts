import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialLearnPageRegistrationComponent } from './trial-learn-page-registration.component';

describe('TrialLearnPageRegistrationComponent', () => {
  let component: TrialLearnPageRegistrationComponent;
  let fixture: ComponentFixture<TrialLearnPageRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialLearnPageRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialLearnPageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
