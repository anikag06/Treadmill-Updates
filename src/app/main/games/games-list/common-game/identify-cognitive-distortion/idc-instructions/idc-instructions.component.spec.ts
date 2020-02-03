import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcInstructionsComponent } from './idc-instructions.component';

describe('IdcInstructionsComponent', () => {
  let component: IdcInstructionsComponent;
  let fixture: ComponentFixture<IdcInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcInstructionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
