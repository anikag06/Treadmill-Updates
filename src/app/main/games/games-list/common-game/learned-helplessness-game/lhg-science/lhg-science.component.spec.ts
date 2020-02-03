import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LhgScienceComponent } from './lhg-science.component';

describe('LhgScienceComponent', () => {
  let component: LhgScienceComponent;
  let fixture: ComponentFixture<LhgScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LhgScienceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LhgScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
