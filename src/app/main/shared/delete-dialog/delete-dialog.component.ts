import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  warning!: string;
  confirm!: string;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) {
    this.confirm = this.data.confirm;
    this.warning = this.data.warning;
  }

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    this.dialogRef.close({ event: 'close', data: true });
  }
}
