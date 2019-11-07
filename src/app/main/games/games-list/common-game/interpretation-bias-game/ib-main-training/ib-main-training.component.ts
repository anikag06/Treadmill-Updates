import { Component, OnInit, Inject, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IbDialogsService } from '../ib-dialogs.service';
import { IbTrainingDataService } from './ib-training-data.service';
declare var ibGameTrainingSen: any;
@Component({
  selector: 'app-ib-main-training',
  templateUrl: './ib-main-training.component.html',
  styleUrls: ['./ib-main-training.component.scss']
})
export class IbMainTrainingComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    // public dialogRef: MatDialogRef<IbMainTrainingComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private ibDialogService: IbTrainingDataService,
  ) {
    // dialogRef.disableClose = true;
  }

  ngOnInit() {
    console.log('in the trainging function');
    ibGameTrainingSen();
  }

  storeUserScoreInfo(response: boolean) {
    // this.dialogRef.close();
    this.ibDialogService.callStoreDataMethod(response);
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }

}
