import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Optional,
  Output,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-techniques-info',
  templateUrl: './techniques-info.component.html',
  styleUrls: ['./techniques-info.component.scss'],
})
export class TechniquesInfoComponent implements OnInit {
  @Output() closeInfo = new EventEmitter();
  about!: string;
  techniques!: string;

  constructor(
    public dialogRef: MatDialogRef<TechniquesInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.techniques = data.techniquesInfo;
      this.about = data.about;
    }
  }

  ngOnInit() {}

  closeInfoModal() {
    this.dialogRef.close({ event: 'close' });
  }
}
