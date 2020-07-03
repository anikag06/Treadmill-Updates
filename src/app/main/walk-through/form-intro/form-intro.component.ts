import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-intro',
  templateUrl: './form-intro.component.html',
  styleUrls: ['./form-intro.component.scss'],
})
export class FormIntroComponent implements OnInit {
  btnTxt!: string;
  form!:any;
  constructor(
    private dialogRef: MatDialogRef<FormIntroComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    if (this.data) {
      this.btnTxt = this.data.buttonText;
      this.form = this.data.form;
    }
  }
  startIntro() {
    this.dialogRef.close();
  }
}
