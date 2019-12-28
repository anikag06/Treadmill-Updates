import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EttbfOutcomeComponent } from './ettbf-outcome.component';

describe('EttbfOutcomeComponent', () => {
  let component: EttbfOutcomeComponent;
  let fixture: ComponentFixture<EttbfOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EttbfOutcomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EttbfOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
