import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLastPageComponent } from './step-last-page.component';

describe('StepLastPageComponent', () => {
  let component: StepLastPageComponent;
  let fixture: ComponentFixture<StepLastPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepLastPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepLastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
