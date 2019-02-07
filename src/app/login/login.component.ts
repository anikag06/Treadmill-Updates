import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { trigger, 
         state, 
         style, 
         animate, 
         transition 
      } from '@angular/animations';

import { MatLoginDialogComponent } from '@/login/mat-login-dialog/mat-login-dialog.component';
import { LoggerService } from '@/shared/logger.service';

@Component({
  selector: 'app-login',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({
        opacity: 1
      })),
      state('inVisible', style({
        opacity: 0
      })),
      transition('visible => inVisible', [
        animate('1s ease-in')
      ]),
      transition('inVisible => visible', [
        animate('1s ease-out')
      ]),
    ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./mat-login-dialog/mat-login-dialog.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {
  private username!: string;
  private password!: string;
  private innerWidth!: number;
  private innerHeight!: number;
  private isVisible: boolean = true;
  // 4s uptime and 1s downtime
  private pulseDuration: number = 5000;
  private downTime: number = 1000;
  private pulseOne: boolean = true;
  private pulseTwo: boolean = true;

  // showing a set of thoughts
  private thoughArray: string[] = [ "I won't be able to do it",
                                    "I am not good enough",
                                    "I have let others down",
                                    "I have no self control at all"];
  nat: string = this.thoughArray[0];
  private thoughtChangeCounter: number = 0;

  // showing a set of reasons how TreadWill will help the user
  private helpReasonsArray: string[] = ["It teaches you techniques of Cognitive Behavioral Therapy",
                                        "It helps you connect with others having similar problems",
                                        "It adapts to your problems",
                                        "And it's free"];
  helpReason: string = this.helpReasonsArray[0];
  private helpReasonChangeCounter: number = 0;

  constructor(
    private dialog: MatDialog,
    private logger: LoggerService,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    
    setTimeout(() => {
      this.togglePulseOne();
    }, this.pulseDuration);
    setTimeout(() => {
      this.togglePulseTwo();
    }, (this.pulseDuration - this.downTime));
  }

  showLogin() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const loginDialogRef = this.dialog.open(MatLoginDialogComponent, {
      data: {username: this.username, password: this.password},
      minWidth: this.innerWidth/3,
      minHeight: this.innerHeight*(2/3),
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'login-dialog',
      scrollStrategy
    });

    loginDialogRef.afterClosed().subscribe((result: string) => {
      this.logger.log('Login data: ', result);
    });
  }

  updateThoughtCounter() {
    if (this.thoughtChangeCounter < (this.thoughArray.length-1)) {
      this.thoughtChangeCounter++;
    } else {
      this.thoughtChangeCounter = 0;
    }
    this.nat = this.thoughArray[this.thoughtChangeCounter];
  }

  updateReasonCounter() {
    if (this.helpReasonChangeCounter < (this.helpReasonsArray.length-1)) {
      this.helpReasonChangeCounter++;
    } else {
      this.helpReasonChangeCounter = 0;
    }
    this.helpReason = this.helpReasonsArray[this.helpReasonChangeCounter];
  }

  togglePulseOne() {
    // for the first time
    this.pulseOne = !this.pulseOne;
    this.setIsVisible();
   
    setInterval(() => {
      this.pulseOne = !this.pulseOne;
      this.setIsVisible();
    }, this.pulseDuration);
  }

  togglePulseTwo() {
    // for the first time
    this.pulseTwo = !this.pulseTwo;
    this.setIsVisible();

    setInterval(() => {
      this.pulseTwo = !this.pulseTwo;
      this.setIsVisible();
    }, this.pulseDuration);
  }

  setIsVisible() {
    this.isVisible = (this.pulseOne && this.pulseTwo) || (!this.pulseOne && !this.pulseTwo);

    if(this.isVisible) {
      this.updateThoughtCounter();
      this.updateReasonCounter();
    }
  }
}
