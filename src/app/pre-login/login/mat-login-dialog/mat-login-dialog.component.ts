import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthService } from '@/shared/auth/auth.service';
import { TOKEN, USERAVATAR } from '@/app.constants';
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
  showForm = true;
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<MatLoginDialogComponent>,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    localforage.clear();
    localStorage.clear();
    this.showForm = false;
    this.authService.getUserDetails(this.loginForm.value)
      .then(
        (data: any) => {
          localforage.setItem(USERAVATAR, data.data.avatar);
          localforage.setItem(TOKEN, data.data.token)
            .then((status) => {
              this.dialogRef.close();
              this.router.navigate(['/dashboard']);
            }).catch(() => {
              console.log('Something went wrong');
            });
        }
      ).catch(
        (error: any) => {
          if (error.status === 400 ) {
            this.loginForm.reset();
            this.showForm = true;
            this.formInvalid = true;
          }
        }
      ).finally(() => {
        this.showForm = true;
      });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
