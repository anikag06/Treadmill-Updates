import { Injectable } from '@angular/core';
import { AuthService } from '@/shared/auth/auth.service';

@Injectable()
export class TimerService {
  constructor(private authservice: AuthService) {}

  seconds!: number;
  startTime!: Date;
  endTime!: any;
  sum = 0;
  i = false;
  onunload = 0;
  online!: any;
  timeSum = 0;

  tick() {
    if (document.visibilityState === 'visible') {
      this.startTime = new Date();
      this.i = true;
    } else {
      this.endTime = new Date();
      if (this.i === false) {
        this.sum = this.endTime.getTime() - this.startTime.getTime();
      }
      console.log(this.endTime);
      if (this.i === true) {
        this.sum =
          this.sum + (this.endTime.getTime() - this.startTime.getTime());
      }
    }
  }

  visibility() {
    this.startTime = new Date();
    document.addEventListener('visibilitychange', () => this.tick());
  }

  removeVisibility() {
    this.endTime = new Date();
    this.sum = this.sum + (this.endTime.getTime() - this.startTime.getTime());
    document.removeEventListener('visibilitychange', () => this.tick());
    return this.sum;
  }

  unload() {
    window.addEventListener('beforeunload', event => {
      this.onunload = 1;
    });
  }

  get_onunload() {
    return this.onunload;
  }

  internet_check() {
    this.online = this.authservice.returnOnline();
    this.online.subscribe((f: any) => {
      if (f === false) {
        console.log('no internet connection');
      } else {
        console.log('you are connected');
      }
    });
  }

  showTime(question_no: number, startTime: Date, first_click: boolean) {
    const now = new Date();
    const timeDiff = now.getTime() - startTime.getTime();
    if (first_click && question_no === 0) {
      this.seconds = timeDiff;
    } else {
      this.seconds = timeDiff - this.timeSum;
    }
    console.log('now time =', now.getTime(), 'start time = ', startTime.getTime(), 'time sum =', this.timeSum, 'first click= ', first_click);
    // question_no >= 0
    //   ? (this.seconds = timeDiff - this.timeSum)
    //   : (this.seconds = timeDiff);
    // this.seconds = this.seconds;
    this.timeSum = timeDiff;
    console.log('Question no, Time', question_no + 1, this.seconds);
    return this.seconds;
  }
}
