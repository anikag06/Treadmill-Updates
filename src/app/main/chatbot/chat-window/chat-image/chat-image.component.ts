import { Component, Input, OnInit } from '@angular/core';
import { MOBILE_WIDTH } from '@/app.constants';

@Component({
  selector: 'app-chat-image',
  templateUrl: './chat-image.component.html',
  styleUrls: ['./chat-image.component.scss'],
})
export class ChatImageComponent implements OnInit {
  @Input() image!: any;
  @Input() fromConversation!: boolean;
  dataLoaded = false;
  showGIFIcon!: boolean;
  width = '280px';
  ngOnInit() {
    this.showGIFIcon =
      (this.image.static_url && this.fromConversation) || this.image.creditsGIF;
    if (this.fromConversation && window.innerWidth > MOBILE_WIDTH) {
      this.width = '400px';
    } else if (this.fromConversation) {
      this.width = '240px';
    }
  }

  changeUrl() {
    if (this.image && this.image.dynamic_url) {
      this.image.showSpinner =
        this.image.url === this.image.dynamic_url ? false : true;
      this.image.url =
        this.image.url === this.image.static_url
          ? this.image.dynamic_url
          : this.image.static_url;
      if (this.image.url === this.image.dynamic_url) {
        setTimeout(() => {
          this.image.url = this.image.static_url;
        }, 10000);
      }
    }
  }

  changeLoading() {
    this.image.showSpinner = false;
    this.dataLoaded = true;
  }
}
