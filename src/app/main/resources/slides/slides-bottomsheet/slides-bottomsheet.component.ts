import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { SlidesVideoComponent } from '../slides-video/slides-video.component';

@Component({
  selector: 'app-slides-bottomsheet',
  templateUrl: './slides-bottomsheet.component.html',
  styleUrls: ['./slides-bottomsheet.component.scss']
})
export class SlidesBottomsheetComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<SlidesBottomsheetComponent>,
    public dialog: MatDialog, ) { }

  ngOnInit() {
  }

  onClickYes() {
    this._bottomSheetRef.dismiss();
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(SlidesVideoComponent, {
      height: '80vh',
      width: '70vw',
    });
  }
  onClickNo() {
    this._bottomSheetRef.dismiss();
  }

}
