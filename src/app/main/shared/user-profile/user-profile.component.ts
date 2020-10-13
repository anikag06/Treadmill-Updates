import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { MOBILE_WIDTH } from '@/app.constants';
import { UserProfile } from './UserProfile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  constructor(private element: ElementRef) {}
  @Input() userProfile!: UserProfile;
  showLoading = true;
  profileLoaded = false;
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
    setTimeout( () => {
      this.showLoading = false;
      setTimeout( () => {
        this.profileLoaded = true;
      }, 500);
    }, 100);
  }
}
