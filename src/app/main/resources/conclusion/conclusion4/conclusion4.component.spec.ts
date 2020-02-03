import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Conclusion4Component } from './conclusion4.component';

describe('Conclusion4Component', () => {
  let component: Conclusion4Component;
  let fixture: ComponentFixture<Conclusion4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Conclusion4Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Conclusion4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
