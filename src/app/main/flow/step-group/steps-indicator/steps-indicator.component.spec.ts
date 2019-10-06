import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsIndicatorComponent } from './steps-indicator.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StepsIndicatorComponent', () => {
  let component: StepsIndicatorComponent;
  let fixture: ComponentFixture<StepsIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsIndicatorComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
