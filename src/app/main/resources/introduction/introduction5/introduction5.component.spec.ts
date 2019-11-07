import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduction5Component } from './introduction5.component';

describe('Introduction5Component', () => {
  let component: Introduction5Component;
  let fixture: ComponentFixture<Introduction5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Introduction5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Introduction5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
