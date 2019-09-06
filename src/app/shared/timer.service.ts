import { Injectable, DoCheck } from '@angular/core';
import { element } from 'protractor';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import {fromEvent, Observable, Observer, merge, BehaviorSubject} from 'rxjs';
import { NetworkStatusAngularService } from 'network-status-angular';

@Injectable()
export class TimerService {

    constructor (private authservice: AuthService, private networkStatusAngularService: NetworkStatusAngularService) {
        this.networkStatusAngularService.status.subscribe((status: any) => {
            console.log(status); // returns true if it is online or false if it is offline
          });
    }



    seconds!: number;
    startTime!: Date;
    endTime!: any;
    sum = 0;
    i = false;
    onunload = 0;
    online!: any;


    tick() {
        if (document.visibilityState === 'visible') {
            this.startTime = new Date();
            console.log(this.startTime);
            this.i = true;
        } else {
            this.endTime = new Date();
            if (this.i === false) {
                this.sum = this.endTime.getTime() - this.startTime.getTime();
                console.log(this.sum);
                }
            console.log(this.endTime);
            if (this.i === true) {
                this.sum = this.sum + (this.endTime.getTime() - this.startTime.getTime());
                console.log(this.sum);
            }
        }
    }

    visibility() {
        this.startTime = new Date();
        console.log(this.startTime);
        document.addEventListener('visibilitychange', () => this.tick());
    }

    removeVisibility() {
        this.endTime = new Date();
        console.log(this.endTime);
        this.sum = this.sum + (this.endTime.getTime() - this.startTime.getTime());
        document.removeEventListener('visibilitychange', () => this.tick());
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
