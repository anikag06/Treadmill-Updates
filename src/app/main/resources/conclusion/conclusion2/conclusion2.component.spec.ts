import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Conclusion2Component } from './conclusion2.component';

describe('Conclusion2Component', () => {
  let component: Conclusion2Component;
  let fixture: ComponentFixture<Conclusion2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Conclusion2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Conclusion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
