import { Component, OnInit, Input } from '@angular/core';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MOBILE_WIDTH, TREADWILL } from '@/app.constants';
import { Title } from '@angular/platform-browser';
import { UserProfile } from '../shared/user-profile/UserProfile.model';
import { UserProfileService } from '../shared/user-profile/userProfile.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mobileView = false;
  user!: User;
  constructor(
    private authService: AuthService,
    private titleService: Title,
    private userProfileService: UserProfileService,
  ) {
    this.titleService.setTitle('Dashboard | ' + TREADWILL);
  }

  userProfile = new UserProfile('Name', '', 0, 0, 0, 0, [], [], []);

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
      });
  }
}
