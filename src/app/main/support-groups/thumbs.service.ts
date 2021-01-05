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
      return 'assets/support-group/thumbsup-filled.svg';
    }
    return 'assets/support-group/thumbsup-outlined.svg';
  }

  /**
   * Thumbs Down images
   */
  thumbsDownSrc(object: any) {
    if (object.is_voted === -1) {
      return 'assets/support-group/thumbsdown-filled.svg';
    }
    return 'assets/support-group/thumbsdown-outlined.svg';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
