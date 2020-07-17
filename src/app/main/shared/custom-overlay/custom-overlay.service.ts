import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomOverlayService {
  closeChatbotOverlay = new EventEmitter<any>();
  overlayOpen = new EventEmitter<any>();
  overlayClose = new EventEmitter<any>();
  showChatbot!: boolean;
  showFlow = false;
  constructor() {}
}
