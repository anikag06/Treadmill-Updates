import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resources2Component } from './resources2.component';

describe('Resources2Component', () => {
  let component: Resources2Component;
  let fixture: ComponentFixture<Resources2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Resources2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resources2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
