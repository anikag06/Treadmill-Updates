import { Component, ElementRef, OnInit, Renderer2, AfterViewInit, Input } from '@angular/core';
import { Badge } from './badges/badge.model';
import { UserProfile } from './UserProfile.model';
import { UserProfileService } from './userProfile.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  constructor(private userProfileService: UserProfileService, private element: ElementRef) { }

  userProfile = new UserProfile('', '', 0, 0, 0, 0, [], [], []);

  ngOnInit() {
    this.userProfileService.getUserProfile().subscribe(profile => {
      this.userProfile = new UserProfile(profile.username, profile.user_avatar,
        profile.score, profile.no_of_bronze_badges, profile.no_of_silver_badges,
        profile.no_of_gold_badges, profile.badge_list_bronze,
        profile.badge_list_silver, profile.badge_list_gold);
    })
  }

  ngAfterViewInit() {
    const inkBar = this.element.nativeElement.querySelectorAll('.mat-tab-group.mat-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary .mat-ink-bar');
    inkBar[0].setAttribute('style', 'background: black');
  }


  getGoldBadgeList(): Badge[] {
    
    return this.userProfile.badge_list_gold;
  }

  getSilverBadgeList(): Badge[] {
    return this.userProfile.badge_list_silver;
  }
  getBronzeBadgeList(): Badge[] {
    return this.userProfile.badge_list_bronze;
  }

}
