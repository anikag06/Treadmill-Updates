import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomOverlayService {
  closeChatbotOverlay = new EventEmitter<any>();

  showChatbot!: boolean;
  showFlow!: boolean;
  constructor() {}
}
