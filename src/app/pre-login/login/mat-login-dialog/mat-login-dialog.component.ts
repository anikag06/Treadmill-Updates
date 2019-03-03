import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthService } from '@/shared/auth/auth.service';
import { LocalStorageService } from '@/shared/localstorage.service';
import { TOKEN } from '@/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mat-login-dialog',
  templateUrl: './mat-login-dialog.component.html',
  styleUrls: ['./mat-login-dialog.component.scss']
})
export class MatLoginDialogComponent implements OnInit {
  hide: boolean = true;
  @ViewChild('loginForm') loginForm!: NgForm

  constructor(
    public dialogRef: MatDialogRef<MatLoginDialogComponent>,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
    
  ngOnInit() {
  }

  onSubmit() {
    this.authService.getUserDetails(this.loginForm.value)
      .subscribe(
        (data: any) => {
          this.localStorageService.setItem(TOKEN, data.data.token)
          this.dialogRef.close();
          this.router.navigate(["/modules"])
        }
      )
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
