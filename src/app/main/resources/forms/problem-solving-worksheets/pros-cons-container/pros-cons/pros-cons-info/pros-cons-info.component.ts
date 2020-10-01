import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pros-cons-info',
  templateUrl: './pros-cons-info.component.html',
  styleUrls: ['./pros-cons-info.component.scss'],
})
export class ProsConsInfoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProsConsInfoComponent>) {}

  ngOnInit() {}

  closeInfoModal() {
    this.dialogRef.close({ event: 'close' });
  }
}
