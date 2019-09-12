import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
// import { CongratsDialogComponent } from './congrats-dialog/congrats-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogsService {

  constructor( private dialog: MatDialog,
    // private congratsDialog: CongratsDialogComponent
    ) { }

  openCongratsDialog() {
    console.log('called');
    // const dialogRef = this.dialog.open(CongratsDialogComponent, {
    //   width: '250px',
    // });

  }
  checkfun() {
    console.log('check fun');
  }
}
