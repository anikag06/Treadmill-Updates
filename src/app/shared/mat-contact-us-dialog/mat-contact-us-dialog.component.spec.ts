import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatContactUsDialogComponent } from './mat-contact-us-dialog.component';

describe('MatContactUsDialogComponent', () => {
  let component: MatContactUsDialogComponent;
  let fixture: ComponentFixture<MatContactUsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatContactUsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatContactUsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
