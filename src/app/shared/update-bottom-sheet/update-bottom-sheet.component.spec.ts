import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBottomSheetComponent } from './update-bottom-sheet.component';

describe('UpdateBottomSheetComponent', () => {
  let component: UpdateBottomSheetComponent;
  let fixture: ComponentFixture<UpdateBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
