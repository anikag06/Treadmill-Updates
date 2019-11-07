import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduction3Component } from './introduction3.component';

describe('Introduction3Component', () => {
  let component: Introduction3Component;
  let fixture: ComponentFixture<Introduction3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Introduction3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Introduction3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
