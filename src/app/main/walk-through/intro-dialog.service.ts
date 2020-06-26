import { Injectable } from '@angular/core';
import { SupportGroupIntroComponent } from '@/main/walk-through/support-group-intro/support-group-intro.component';
import { IntroSelectTagsComponent } from '@/main/walk-through/intro-select-tags/intro-select-tags.component';
import { MOBILE_WIDTH } from '@/app.constants';
import { MatDialog } from '@angular/material/dialog';
import { IntroDialogComponent } from '@/main/walk-through/intro-dialog/intro-dialog.component';
import { GameIntroComponent } from '@/main/walk-through/game-intro/game-intro.component';
import { FormIntroComponent } from '@/main/walk-through/form-intro/form-intro.component';
import { IntroService } from '@/main/walk-through/intro.service';

@Injectable({
  providedIn: 'root',
})
export class IntroDialogService {
  constructor(public dialog: MatDialog, private introService: IntroService) {}

  buttonHTML =
    "   Next <span [ngStyle]=\"{fontSize: '40px',verticalAlign:'sub'}\"> &#8594;</span>";
  openIntroDialog() {
    const dialogRef = this.dialog.open(IntroDialogComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.introService.startIntro();
    });
  }

  openGameIntroDialog(fromFlow: boolean) {
    const dialogRef = this.dialog.open(GameIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
      data: {
        buttonText: fromFlow ? this.buttonHTML : 'Done',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (fromFlow) {
        this.introService.callNavBarGameIntro();
      }
    });
  }

  openFormIntroDialog(fromFlow: boolean) {
    const dialogRef = this.dialog.open(FormIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
      data: {
        buttonText: fromFlow ? this.buttonHTML : 'Done',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (fromFlow) {
        this.introService.callNavbarFormIntro();
      }
    });
  }

  openSupportGroupIntroDialog(fromFlow: boolean) {
    const dialogRef = this.dialog.open(SupportGroupIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const dialogRef = this.dialog.open(IntroSelectTagsComponent, {
        panelClass: 'intro-tag-dialog',
        autoFocus: false,
        maxWidth: window.innerWidth < MOBILE_WIDTH ? '340px' : '70%',
        maxHeight: '600px',
        disableClose: true,
        data: {
          fromFLow: fromFlow,
        },
      });
    });
  }
}
