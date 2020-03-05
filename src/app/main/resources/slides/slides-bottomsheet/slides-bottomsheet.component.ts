import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { SlidesVideoComponent } from '../slides-video/slides-video.component';

@Component({
  selector: 'app-slides-bottomsheet',
  templateUrl: './slides-bottomsheet.component.html',
  styleUrls: ['./slides-bottomsheet.component.scss'],
})
export class SlidesBottomsheetComponent implements OnInit {
  srcWidth!: number;
  @ViewChild('yesbtn', { static: false }) yesbtn!: ElementRef;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SlidesBottomsheetComponent>,
    public dialog: MatDialog,
    private element: ElementRef,
  ) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.srcWidth = window.innerWidth;
  }

  ngOnInit() { }

  onClickYes() {
    this._bottomSheetRef.dismiss();
    this.openDialog();
  }

  openDialog() {
    if (this.srcWidth <= 576) {
      this.dialog.open(SlidesVideoComponent, {
        height: '90vh',
        width: '99vw',
        maxWidth: '99vw',
        panelClass: 'slide-video',
      });
    } else {
      this.dialog.open(SlidesVideoComponent, {
        height: '80vh',
        width: '70vw',
        panelClass: 'slide-video',
      });
    }
  }
  onClickNo() {
    this._bottomSheetRef.dismiss();
  }
}
