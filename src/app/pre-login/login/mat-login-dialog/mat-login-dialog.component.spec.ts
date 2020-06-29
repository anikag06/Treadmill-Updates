import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLoginDialogComponent } from './mat-login-dialog.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogSize } from '@/shared/dialog-size.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@/shared/localstorage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MatLoginDialogComponent', () => {
  let component: MatLoginDialogComponent;
  let fixture: ComponentFixture<MatLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [MatLoginDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MatContactUsDialogService,
        DialogSize,
        LocalStorageService,
      ],
    }).compileComponents();
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
