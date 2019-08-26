import { Injectable, DoCheck } from '@angular/core';
import { element } from 'protractor';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import {fromEvent, Observable, Observer, merge, BehaviorSubject} from 'rxjs';


@Injectable()
export class TimerService {

    constructor (private authservice: AuthService) {
    }



    seconds!: number;
    startTime!: Date;
    endTime!: any;
    sum = 0;
    i = false;
    onunload = 0;
    online!: any;


    tick(start: Date) {
        if ( this.i === true) {
        this.sum = this.sum + (start.getTime() - this.endTime.getTime());
        this.endTime = start;
        } else {
            this.endTime = start;
            this.i = true;
        }
    }



    visibility() {
        this.startTime = new Date();
        return document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                if (this.i === false) { this.endTime = new Date();
                this.sum = this.endTime.getTime() - this.startTime.getTime();
                }
                this.startTime = new Date();
                this.tick(this.startTime);
            }
        });
    }

    removeVisibility() {
        this.endTime = new Date();
        this.sum = this.sum + (this.endTime.getTime() - this.startTime.getTime());
        document.removeEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                if (this.i === false) { this.endTime = new Date();
                this.sum = this.endTime.getTime() - this.startTime.getTime();
                }
                this.startTime = new Date();
                this.tick(this.startTime);
            }
        });
        console.log(this.sum);
        return this.sum;
    }

    unload() {
        window.addEventListener('beforeunload', (event) => {
            this.onunload = 1;
        }
        );
    }

    get_onunload () {
        return this.onunload;
    }

    internet_check() {
        this.online = this.authservice.returnOnline();
        console.log(this.online);
        this.online.subscribe((f: any) => {
                if (f === false) {
                    console.log('no internet connection');
                } else {
                    console.log('you are connected');
                }
        }
        );
    }

}
