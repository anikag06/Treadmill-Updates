import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduction4Component } from './introduction4.component';

describe('Introduction4Component', () => {
  let component: Introduction4Component;
  let fixture: ComponentFixture<Introduction4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Introduction4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Introduction4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
