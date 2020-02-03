import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeExplanationComponent } from './alternative-explanation.component';

describe('ExplainationComponent', () => {
  let component: AlternativeExplanationComponent;
  let fixture: ComponentFixture<AlternativeExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlternativeExplanationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
