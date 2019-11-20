import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Conclusion3Component } from './conclusion3.component';

describe('Conclusion3Component', () => {
  let component: Conclusion3Component;
  let fixture: ComponentFixture<Conclusion3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Conclusion3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Conclusion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
