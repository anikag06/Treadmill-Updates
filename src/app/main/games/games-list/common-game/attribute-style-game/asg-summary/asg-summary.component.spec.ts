import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsgSummaryComponent } from './asg-summary.component';

describe('AsgSummaryComponent', () => {
  let component: AsgSummaryComponent;
  let fixture: ComponentFixture<AsgSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsgSummaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsgSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
