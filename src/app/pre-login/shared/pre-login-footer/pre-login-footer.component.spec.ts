import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginFooterComponent } from './pre-login-footer.component';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@/material.module';

import { DialogSize } from '@/shared/dialog-size.service';

describe('PreLoginFooterComponent', () => {
  let component: PreLoginFooterComponent;
  let fixture: ComponentFixture<PreLoginFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [ PreLoginFooterComponent ],
      providers: [
        MatContactUsDialogService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        DialogSize,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
