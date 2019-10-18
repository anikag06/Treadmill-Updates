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
    const dialogRef = this.dialog.open(IbGameInstructionsComponent, {
      panelClass: 'instruct-dialog',
      width: '90%',
      maxWidth: '350px',
      height: '78%',
      autoFocus: false
    });
  }

  openSentenceWordDialog() {
    const dialogRef = this.dialog.open(IbMainTrainingComponent, {
      width: '90%',
      maxWidth: '350px',
      autoFocus: false,
      hasBackdrop: false,
    });
  }

}
