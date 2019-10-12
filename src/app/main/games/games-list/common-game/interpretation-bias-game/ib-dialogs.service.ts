import { Injectable } from '@angular/core';
import { IbGameInstructionsComponent } from './ib-game-instructions/ib-game-instructions.component';
import { MatDialog } from '@angular/material';
import { IbMainTrainingComponent } from './ib-main-training/ib-main-training.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbDialogsService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openInstructionDialog() {
    console.log('reaching here');
    const dialogRef = this.dialog.open(IbGameInstructionsComponent, {
      panelClass: 'instruct-dialog',
      width: '90%',
      maxWidth: '100%',
      height: '78%',
      autoFocus: false
    });
  }

  openSentenceWordDialog() {
    console.log('open sentence word dialog');
    const dialogRef = this.dialog.open(IbMainTrainingComponent, {
      width: '90%',
      maxWidth: '100%',
      autoFocus: false
    });
  }


  
}
