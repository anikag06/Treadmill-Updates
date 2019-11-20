import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Conclusion5Component } from './conclusion5.component';

describe('Conclusion5Component', () => {
  let component: Conclusion5Component;
  let fixture: ComponentFixture<Conclusion5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Conclusion5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Conclusion5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
