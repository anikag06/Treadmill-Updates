import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthService } from '@/shared/auth/auth.service';
import { LocalStorageService } from '@/shared/localstorage.service';
import { TOKEN } from '@/app.constants';
import { Router } from '@angular/router';
import * as localforage from 'localforage';

@Component({
  selector: 'app-mat-login-dialog',
  templateUrl: './mat-login-dialog.component.html',
  styleUrls: ['./mat-login-dialog.component.scss']
})
export class MatLoginDialogComponent implements OnInit {
  hide = true;
  formInvalid = false;
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<MatLoginDialogComponent>,
    private authService: AuthService,
    // private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.getUserDetails(this.loginForm.value)
      .subscribe(
        (data: any) => {
          localforage.setItem(TOKEN, data.data.token)
            .then((status) => {
              this.dialogRef.close();
              this.router.navigate(['/dashboard'])
            }).catch(() => {
              console.log('Something went wrong');
            });
        },
        (error: any) => {
          if (error.status === 400 ) {
            this.loginForm.reset();
            this.formInvalid = true;
          }
        }
      );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
