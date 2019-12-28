import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LhgGreatComponent } from './lhg-great.component';

describe('LhgGreatComponent', () => {
  let component: LhgGreatComponent;
  let fixture: ComponentFixture<LhgGreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LhgGreatComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LhgGreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
