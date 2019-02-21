import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginData } from '@/pre-login/login/login-data.interface';

@Component({
  selector: 'app-mat-login-dialog',
  templateUrl: './mat-login-dialog.component.html',
  styleUrls: ['./mat-login-dialog.component.scss']
})
export class MatLoginDialogComponent implements OnInit {
  hide: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<MatLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData
  ) { }
    
  ngOnInit() {
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
