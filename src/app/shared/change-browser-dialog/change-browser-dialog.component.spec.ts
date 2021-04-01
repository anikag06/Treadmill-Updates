import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBrowserDialogComponent } from './change-browser-dialog.component';

describe('ChangeBrowserDialogComponent', () => {
  let component: ChangeBrowserDialogComponent;
  let fixture: ComponentFixture<ChangeBrowserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBrowserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBrowserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
