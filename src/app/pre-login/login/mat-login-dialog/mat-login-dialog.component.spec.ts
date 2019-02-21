import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLoginDialogComponent } from './mat-login-dialog.component';

describe('MatLoginDialogComponent', () => {
  let component: MatLoginDialogComponent;
  let fixture: ComponentFixture<MatLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
