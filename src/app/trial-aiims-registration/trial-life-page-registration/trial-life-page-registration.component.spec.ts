import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialLifePageRegistrationComponent } from './trial-life-page-registration.component';

describe('TrialLifePageRegistrationComponent', () => {
  let component: TrialLifePageRegistrationComponent;
  let fixture: ComponentFixture<TrialLifePageRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialLifePageRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialLifePageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
