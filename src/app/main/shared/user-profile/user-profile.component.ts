import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { MOBILE_WIDTH } from '@/app.constants';
import { UserProfile } from './UserProfile.model';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { CommonService } from '@/shared/common.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private element: ElementRef,
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private commonService: CommonService,
  ) {}
  @Input() userProfile!: UserProfile;
  showLoading = true;
  profileLoaded = false;
  user!: User;
  goldBadgesColor = '#D4AF37';
  silverBadgesColor = '#96959A';
  bronzeBadgesColor = '#CD7F32';

  ngOnInit() {
    this.commonService.introScoreSend.subscribe(() => {
      this.userProfileService
        .getUserProfile(this.userProfile.username)
        .subscribe((data: any) => {
          console.log('userprofile', data.score);
          this.userProfile.score = data.score;
        });
    });
  }

  ngAfterViewInit() {
    const inkBar = this.element.nativeElement.querySelectorAll(
      '.mat-tab-group.mat-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary .mat-ink-bar',
    );
    inkBar[0].setAttribute('style', 'background: black;');
    const tabLabel = this.element.nativeElement.querySelectorAll(
      '.mat-tab-label',
    );
    for (let i = 0; i < tabLabel.length; i++) {
      tabLabel[i].setAttribute(
        'style',
        'min-width: 80px;height:40px;opacity:1',
      );
    }

    if (window.innerWidth < MOBILE_WIDTH) {
      const headerText = this.element.nativeElement.querySelectorAll(
        '.mat-card-header-text',
      );
      headerText[0].setAttribute('style', 'margin: 0px');
    }
  }

  getGoldBadgeList() {
    return this.userProfile.badge_list_gold;
  }

  getSilverBadgeList() {
    return this.userProfile.badge_list_silver;
  }
  getBronzeBadgeList() {
    return this.userProfile.badge_list_bronze;
  }
  removeLoading() {
    setTimeout(() => {
      this.showLoading = false;
      setTimeout(() => {
        this.profileLoaded = true;
      }, 500);
    }, 100);
  }
}
