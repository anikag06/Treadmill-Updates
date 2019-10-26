import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverlayContainer, FullscreenOverlayContainer, Overlay } from '@angular/cdk/overlay';


declare var startIBGame: any;

@Component({
  selector: 'app-ib-game-instructions',
  templateUrl: './ib-game-instructions.component.html',
  styleUrls: ['./ib-game-instructions.component.scss'],
  providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
})
export class IbGameInstructionsComponent implements OnInit {

  // @Input() game_element!: HTMLElement;
  game_element!: any;

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
