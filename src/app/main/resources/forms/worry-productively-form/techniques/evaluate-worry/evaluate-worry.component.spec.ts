import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateWorryComponent } from './evaluate-worry.component';

describe('EvaluateWorryComponent', () => {
  let component: EvaluateWorryComponent;
  let fixture: ComponentFixture<EvaluateWorryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluateWorryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateWorryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
