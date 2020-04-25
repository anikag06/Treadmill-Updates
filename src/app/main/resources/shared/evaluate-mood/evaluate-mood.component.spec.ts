import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateMoodComponent } from './evaluate-mood.component';

describe('EvaluateMoodComponent', () => {
  let component: EvaluateMoodComponent;
  let fixture: ComponentFixture<EvaluateMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
