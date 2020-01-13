import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Optional,
  Inject,
} from '@angular/core';
import { TECHNIQUE_DATA } from './technique.data';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-techniques-info',
  templateUrl: './techniques-info.component.html',
  styleUrls: ['./techniques-info.component.scss'],
})
export class TechniquesInfoComponent implements OnInit {
  @Output() closeInfo = new EventEmitter();
  about = 'About Techniques';
  techniques = TECHNIQUE_DATA;

  constructor(public dialogRef: MatDialogRef<TechniquesInfoComponent>) {}

  ngOnInit() {}

  closeInfoModal() {
    this.dialogRef.close({ event: 'close' });
  }
}
