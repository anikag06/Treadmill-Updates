import { Component, OnInit } from '@angular/core';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MOBILE_WIDTH, SCORE, TABLET_WIDTH, TREADWILL } from '@/app.constants';
import { Title } from '@angular/platform-browser';
import { UserProfile } from '../shared/user-profile/UserProfile.model';
import { UserProfileService } from '../shared/user-profile/user-profile.service';
import { IntroService } from '@/main/walk-through/intro.service';
import { Subscription } from 'rxjs';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { UpdateBottomSheetComponent } from '@/shared/update-bottom-sheet/update-bottom-sheet.component';
import { SwUpdate } from '@angular/service-worker';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mobileView = false;
  showQuestionnaire = false;
  introduceSubscription!: Subscription;
  hideSubscription!: Subscription;
  user!: User;
  constructor(
    private authService: AuthService,
    private titleService: Title,
    private userProfileService: UserProfileService,
    private introService: IntroService,
    private quizService: QuizService,
    private swUpdate: SwUpdate,
    private _bottomSheet: MatBottomSheet,
  ) {
    this.titleService.setTitle('Home | ' + TREADWILL);
    this.checkForUpdates();
  }

  userProfile = new UserProfile('Name', '', 0, 0, 0, 0, [], [], []);
  showFlow = true;
  hideCards = false;
  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.mobileView = window.innerWidth < MOBILE_WIDTH;

    this.userProfileService
      .getUserProfile(this.user.username)
      .subscribe(profile => {
        this.userProfile = new UserProfile(
          profile.username,
          profile.user_avatar,
          profile.score,
          profile.no_of_bronze_badges,
          profile.no_of_silver_badges,
          profile.no_of_gold_badges,
          profile.badge_list_bronze,
          profile.badge_list_silver,
          profile.badge_list_gold,
        );
        window.localStorage.setItem(SCORE, this.userProfile.score.toString());
      });
    if (window.innerWidth < MOBILE_WIDTH) {
      this.introduceSubscription = this.introService.introduceBehaviour.subscribe(
        showFlow => {
          this.showFlow = showFlow;
        },
      );
    }
    this.hideSubscription = this.introService.hideBehaviour.subscribe(
      showFlow => {
        this.hideCards = showFlow;
      },
    );
    this.quizService.showFollowUp.subscribe(() => {
      this.showQuestionnaire = true;
      console.log('show questionnaire');
      this.quizService.followupActive = true;
    });
  }

  ngOnDestroy(): void {
    if (isNotNullOrUndefined(this.introduceSubscription)) {
      this.introduceSubscription.unsubscribe();
    }
    if (isNotNullOrUndefined(this.hideSubscription)) {
      this.hideSubscription.unsubscribe();
    }
  }

  checkForUpdates() {
    this.swUpdate.available.subscribe(event => {
      this.swUpdate.activateUpdate().then(() => {
        this.openBottomSheet();
      });
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(UpdateBottomSheetComponent, {
      panelClass:
        window.innerWidth >= MOBILE_WIDTH ? 'bottom-sheet-container' : '',
      disableClose: true,
    });
  }
}
