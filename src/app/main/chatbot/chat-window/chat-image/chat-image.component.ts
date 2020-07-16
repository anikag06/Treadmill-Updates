import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-image',
  templateUrl: './chat-image.component.html',
  styleUrls: ['./chat-image.component.scss'],
})
export class ChatImageComponent implements OnInit {
  @Input() image!: any;
  @Input() fromConversation! : boolean;
  dataLoaded = false;
  skeletonText!: string;
  ngOnInit() {
    setTimeout(()=>{
       this.dataLoaded = true;
    },2000)
    this.skeletonText = this.image.creditsGIF ? "GIF" : "IMG";
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
    // this.dataLoaded = true;
  }
}
