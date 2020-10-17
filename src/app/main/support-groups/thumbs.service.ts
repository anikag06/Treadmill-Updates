import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ThumbsService {
  isClicked = false;
  constructor(public snackBar: MatSnackBar) {}

  /**
   * Thumbs Up images
   */
  thumbsUpSrc(object: any) {
    if (object.is_voted === 1) {
      this.isClicked = true;
      return 'assets/support-group/thumbs-up-black.svg';

    }
    return 'assets/support-group/thumbs-up-white.svg';
  }

  /**
   * Thumbs Down images
   */
  thumbsDownSrc(object: any) {
    if (object.is_voted === 0) {
      return 'assets/support-group/thumbs-down-black.svg';
    }
    return 'assets/support-group/thumbs-down-white.svg';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
