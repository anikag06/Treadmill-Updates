import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LhgInstructionsComponent } from './lhg-instructions.component';

describe('LhgInstructionsComponent', () => {
  let component: LhgInstructionsComponent;
  let fixture: ComponentFixture<LhgInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LhgInstructionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LhgInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
