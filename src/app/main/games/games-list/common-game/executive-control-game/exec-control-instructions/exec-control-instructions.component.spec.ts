import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecControlInstructionsComponent } from './exec-control-instructions.component';

describe('ExecControlInstructionsComponent', () => {
  let component: ExecControlInstructionsComponent;
  let fixture: ComponentFixture<ExecControlInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExecControlInstructionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecControlInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
