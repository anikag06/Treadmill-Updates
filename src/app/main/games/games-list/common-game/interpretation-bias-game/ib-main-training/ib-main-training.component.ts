import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IbDialogsService } from '../ib-dialogs.service';
import { IbTrainingDataService } from './ib-training-data.service';

@Component({
  selector: 'app-ib-main-training',
  templateUrl: './ib-main-training.component.html',
  styleUrls: ['./ib-main-training.component.scss']
})
export class IbMainTrainingComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<IbMainTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ibDialogService: IbTrainingDataService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  storeUserScoreInfo(response: boolean) {
    this.dialogRef.close();
    this.ibDialogService.callStoreDataMethod(response);
  }

}
