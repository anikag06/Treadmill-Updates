import { Component, OnInit, Input } from '@angular/core';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MOBILE_WIDTH, SCORE, TREADWILL } from '@/app.constants';
import { Title } from '@angular/platform-browser';
import { UserProfile } from '../shared/user-profile/UserProfile.model';
import { UserProfileService } from '../shared/user-profile/user-profile.service';
import { IntroService } from '@/main/walk-through/intro.service';
import { Observable, Subscription, timer } from 'rxjs';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { FlowService } from '@/main/flow/flow.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
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
  ) {
    this.titleService.setTitle('Home | ' + TREADWILL);
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
}
