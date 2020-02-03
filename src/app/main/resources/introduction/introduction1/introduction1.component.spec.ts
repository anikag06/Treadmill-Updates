import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduction1Component } from './introduction1.component';

describe('Introduction1Component', () => {
  let component: Introduction1Component;
  let fixture: ComponentFixture<Introduction1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Introduction1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Introduction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
