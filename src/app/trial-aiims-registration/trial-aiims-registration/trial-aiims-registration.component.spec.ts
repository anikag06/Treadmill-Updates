import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialAiimsRegistrationComponent } from './trial-aiims-registration.component';

describe('TrialAiimsRegistrationComponent', () => {
  let component: TrialAiimsRegistrationComponent;
  let fixture: ComponentFixture<TrialAiimsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialAiimsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialAiimsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
