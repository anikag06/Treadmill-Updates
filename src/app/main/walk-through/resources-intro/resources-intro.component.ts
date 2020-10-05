import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resources-intro',
  templateUrl: './resources-intro.component.html',
  styleUrls: ['./resources-intro.component.scss'],
})
export class ResourcesIntroComponent implements OnInit {
  btnTxt!: string;
  description!: string;
  constructor(
    private dialogRef: MatDialogRef<ResourcesIntroComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.btnTxt = this.data.buttonText;
      this.description = this.data.description;
    }
  }
  startIntro() {
    this.dialogRef.close();
  }
}
