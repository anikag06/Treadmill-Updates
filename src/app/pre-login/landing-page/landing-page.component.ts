import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { Router } from '@angular/router';
import { MOBILE_WIDTH } from '@/app.constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [MatContactUsDialogService],
  animations: [
    trigger('fadeInOut', [
      state(
        'visible',
        style({
          opacity: 1,
        }),
      ),
      state(
        'inVisible',
        style({
          opacity: 0,
        }),
      ),
      transition('visible => inVisible', [animate('1s ease-in')]),
      transition('inVisible => visible', [animate('1s ease-out')]),
    ]),
  ],
})
export class LandingPageComponent implements OnInit {
  // 4s uptime and 1s downtime
  private pulseDuration = 5000;
  private downTime = 1000;
  private pulseOne = true;
  private pulseTwo = true;

  // showing a set of thoughts
  private thoughArray: string[] = [
    "I won't be able to do it",
    'I am not good enough',
    'I have let others down',
    'I have no self control at all',
  ];
  nat: string = this.thoughArray[0];
  private thoughtChangeCounter = 0;

  // showing a set of reasons how TreadWill will help the user
  private helpReasonsArray: string[] = [
    'It teaches you techniques of Cognitive Behavioral Therapy',
    'It helps you connect with others having similar problems',
    'It adapts to your problems',
    "And it's free",
  ];
  helpReason: string = this.helpReasonsArray[0];
  private helpReasonChangeCounter = 0;
  isVisible = true;
  showScrollAnimation = false;
  constructor(
    private showContactUsService: MatContactUsDialogService,
    private showLoginSignupService: ShowLoginSignupDialogService,
    private router: Router,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.togglePulseOne();
    }, this.pulseDuration);
    setTimeout(() => {
      this.togglePulseTwo();
    }, this.pulseDuration - this.downTime);

    setTimeout(() => {
      this.showScrollAnimation = true;
    }, 2000);
  }

  updateThoughtCounter() {
    if (this.thoughtChangeCounter < this.thoughArray.length - 1) {
      this.thoughtChangeCounter++;
    } else {
      this.thoughtChangeCounter = 0;
    }
    this.nat = this.thoughArray[this.thoughtChangeCounter];
  }

  updateReasonCounter() {
    if (this.helpReasonChangeCounter < this.helpReasonsArray.length - 1) {
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
    this.isVisible =
      (this.pulseOne && this.pulseTwo) || (!this.pulseOne && !this.pulseTwo);

    if (this.isVisible) {
      this.updateThoughtCounter();
      this.updateReasonCounter();
    }
  }

  onLandingPageContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  onJoinTheStudyClicked() {
    this.showLoginSignupService.joinStudyClicked();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showScrollAnimation = false;
  }
}
