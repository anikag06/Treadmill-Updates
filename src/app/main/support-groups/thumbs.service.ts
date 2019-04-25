import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThumbsService {

  constructor() { }

  /**
   * Thumbs Up images
   */
  thumbsUpSrc(object: any) {
    if (object.is_voted === 1) {
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
}
