import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Conclusion6Component } from './conclusion6.component';

describe('Conclusion6Component', () => {
  let component: Conclusion6Component;
  let fixture: ComponentFixture<Conclusion6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Conclusion6Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Conclusion6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
