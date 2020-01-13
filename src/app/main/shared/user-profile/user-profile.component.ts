import {AfterViewInit, Component, ElementRef, Input, OnInit,} from '@angular/core';
import {MOBILEWIDTH} from '@/app.constants';
import {Badge} from './badges/badge.model';
import {UserProfile} from './UserProfile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  constructor(private element: ElementRef) {}
  @Input() userProfile!: UserProfile;
  ngOnInit() {}

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

    if (window.innerWidth < MOBILEWIDTH) {
      const headerText = this.element.nativeElement.querySelectorAll(
        '.mat-card-header-text',
      );
      headerText[0].setAttribute('style', 'margin: 0px');
    }
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
