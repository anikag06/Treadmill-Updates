import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-questionnaire-instructions-dialog',
  templateUrl: './questionnaire-instructions-dialog.component.html',
  styleUrls: ['./questionnaire-instructions-dialog.component.scss']
})
export class QuestionnaireInstructionsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuestionnaireInstructionsDialogComponent>,
  ) {}

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }

}
