import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsgInstructionsComponent } from './asg-instructions.component';

describe('AsgInstructionsComponent', () => {
  let component: AsgInstructionsComponent;
  let fixture: ComponentFixture<AsgInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsgInstructionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsgInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
