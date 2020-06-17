import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-game-intro',
  templateUrl: './game-intro.component.html',
  styleUrls: ['./game-intro.component.scss']
})
export class GameIntroComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<GameIntroComponent>,
  ) {}

  ngOnInit() {}

  startIntro() {
    this.dialogRef.close();
  }

}
