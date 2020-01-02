import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfgInstructionsComponent } from './ffg-instructions.component';

describe('FfgInstructionsComponent', () => {
  let component: FfgInstructionsComponent;
  let fixture: ComponentFixture<FfgInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FfgInstructionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfgInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
