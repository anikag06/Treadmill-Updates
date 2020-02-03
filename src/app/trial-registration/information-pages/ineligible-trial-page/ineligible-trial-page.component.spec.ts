import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IneligibleTrialPageComponent } from './ineligible-trial-page.component';

describe('IneligibleTrialPageComponent', () => {
  let component: IneligibleTrialPageComponent;
  let fixture: ComponentFixture<IneligibleTrialPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IneligibleTrialPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IneligibleTrialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
