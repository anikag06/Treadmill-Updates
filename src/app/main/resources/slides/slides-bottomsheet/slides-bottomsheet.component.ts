import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { SlidesVideoComponent } from '../slides-video/slides-video.component';
import { SlideService } from '../slide.service';
import { SlidesVideoOpted, SlidesVideoShowStatus } from '../slides-video.model';

@Component({
  selector: 'app-slides-bottomsheet',
  templateUrl: './slides-bottomsheet.component.html',
  styleUrls: ['./slides-bottomsheet.component.scss'],
})
export class SlidesBottomsheetComponent implements OnInit {
  srcWidth!: number;
  noClicked = false;
  opted!: boolean;
  videoOpted!: SlidesVideoOpted;
  videoShowAgain!: SlidesVideoShowStatus;
  dont_ask_again!: boolean;

  @ViewChild('yesbtn', { static: false }) yesbtn!: ElementRef;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SlidesBottomsheetComponent>,
    public dialog: MatDialog,
    private element: ElementRef,
    private slideService: SlideService,
  ) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.srcWidth = window.innerWidth;
  }

  ngOnInit() {
    this._bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
      if (!this.noClicked) {
        this.onClickNo();
      }
    });
  }

  onClickYes() {
    this.videoOpted = { opted: true };
    this.slideService.storeVideoOption(this.videoOpted).subscribe();
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
        autoFocus: false,
        data: {
          videoUrl: 'https://www.youtube.com/embed/O1oQqpw_8bA?autoplay=1',
          btnText: 'Back to Slides',
          instruction: 'Click play to start',
        },
      });
    } else {
      this.dialog.open(SlidesVideoComponent, {
        height: '80vh',
        width: '70vw',
        panelClass: 'slide-video',
        autoFocus: false,
        data: {
          videoUrl: 'https://www.youtube.com/embed/O1oQqpw_8bA',
          btnText: 'Back to Slides',
          instruction: 'Click play to start',
        },
      });
    }
  }

  onClickNo() {
    this.videoOpted = { opted: false };
    this.noClicked = true;
    console.log('no clicked');
    this.slideService.storeVideoOption(this.videoOpted).subscribe();
  }

  onClickClose() {
    this._bottomSheetRef.dismiss();
    this.videoShowAgain = {
      dont_ask_again: this.dont_ask_again,
    };
    console.log('event', this.dont_ask_again);
    this.slideService.storeVideoShowStatus(this.videoShowAgain).subscribe();
  }

  onCheckboxChange(event: any) {
    this.dont_ask_again = event.checked;
  }
}
