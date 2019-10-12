import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

declare var startIBGame: any;

@Component({
  selector: 'app-ib-game-instructions',
  templateUrl: './ib-game-instructions.component.html',
  styleUrls: ['./ib-game-instructions.component.scss']
})
export class IbGameInstructionsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IbGameInstructionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  onPlayClicked() {
    this.dialogRef.close();
    startIBGame();
  }
}
