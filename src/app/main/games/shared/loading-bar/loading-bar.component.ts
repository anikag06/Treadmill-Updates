import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  loadingBarValue!: number;
  loadingInterval: any;

  constructor() {}

  ngOnInit() {
    this.loadingInterval = setInterval(() => {
      this.updateLoadingbar();
    }, 100);
  }

  updateLoadingbar() {
    console.log(document.readyState);
    if (document.readyState === 'loading') {
      this.loadingBarValue = 50;
    } else if (document.readyState === 'interactive') {
      this.loadingBarValue = 75;
    } else if (document.readyState === 'complete') {
      this.loadingBarValue = 100;
      clearInterval(this.loadingInterval);
      setTimeout(() => {
        const domEvent = new CustomEvent('removeloadingBarEvent', {
          bubbles: true,
        });
        window.dispatchEvent(domEvent);
      }, 1000);
    }
  }
}
