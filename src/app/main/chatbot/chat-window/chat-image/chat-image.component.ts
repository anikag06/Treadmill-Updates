import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-image',
  templateUrl: './chat-image.component.html',
  styleUrls: ['./chat-image.component.scss'],
})
export class ChatImageComponent implements OnInit {
  @Input() image!: any;
  ngOnInit() {}

  changeUrl() {
    if (this.image && this.image.dynamic_url) {
      this.image.showSpinner = true;
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

    // console.log(image.dynamic_url === image.url);
  }

  // hideSpinner() {
  //   if (this.image.showSpinner) {
  //     this.image.showSpinner = false;
  //     setTimeout(() => {
  //       if (this.image.url === this.image.dynamic_url) {
  //         this.image.url = this.image.static_url;
  //       }
  //     }, 10000);
  //   }
  // }
}
