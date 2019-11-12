import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Conclusion1Component } from './conclusion1.component';

describe('Conclusion1Component', () => {
  let component: Conclusion1Component;
  let fixture: ComponentFixture<Conclusion1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Conclusion1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Conclusion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
