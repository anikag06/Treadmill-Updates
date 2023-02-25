import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialOpenRegistrationComponent } from './trial-open-registration.component';

describe('TrialOpenRegistrationComponent', () => {
  let component: TrialOpenRegistrationComponent;
  let fixture: ComponentFixture<TrialOpenRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialOpenRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialOpenRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
