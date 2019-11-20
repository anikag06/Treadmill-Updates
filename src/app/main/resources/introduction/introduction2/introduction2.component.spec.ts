import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduction2Component } from './introduction2.component';

describe('Introduction2Component', () => {
  let component: Introduction2Component;
  let fixture: ComponentFixture<Introduction2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Introduction2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Introduction2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
