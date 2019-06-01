import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSignupDialogComponent } from './mat-signup-dialog.component';

describe('MatSignupDialogComponent', () => {
  let component: MatSignupDialogComponent;
  let fixture: ComponentFixture<MatSignupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSignupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSignupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
