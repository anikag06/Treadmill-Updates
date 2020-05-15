import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduction6Component } from './introduction6.component';

describe('Introduction6Component', () => {
  let component: Introduction6Component;
  let fixture: ComponentFixture<Introduction6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Introduction6Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Introduction6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
