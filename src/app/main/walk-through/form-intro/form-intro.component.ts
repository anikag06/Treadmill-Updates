import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-intro',
  templateUrl: './form-intro.component.html',
  styleUrls: ['./form-intro.component.scss']
})
export class FormIntroComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<FormIntroComponent>,
  ) {}

  ngOnInit() {
  }
  startIntro() {
    this.dialogRef.close();
  }
}
