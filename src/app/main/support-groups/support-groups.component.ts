import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { TagService } from '../shared/tag.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { TREADWILL } from '@/app.constants';
import { UserProfileService } from '../shared/user-profile/userProfile.service';
import { User } from '@/shared/user.model';
import { UserProfile } from '../shared/user-profile/UserProfile.model';
import { AuthService } from '@/shared/auth/auth.service';
import { SupportGroupsService } from './support-groups.service';


@Component({
  selector: 'app-support-groups',
  templateUrl: './support-groups.component.html',
  styleUrls: ['./support-groups.component.scss']
})
export class SupportGroupsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tagService: TagService,
    private titleService: Title,
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private sgService: SupportGroupsService,
    private elem: ElementRef,
  ) {
    this.titleService.setTitle('Support Group | ' + TREADWILL);
    this.getScreenSize();
  }

  user!: User; // Current User
  userProfileData = new UserProfile('Name', '', 0, 0, 0, 0);
  srcWidth!: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {

    this.srcWidth = window.innerWidth;
    console.log('window width', this.srcWidth);
  }

  ngOnInit() {
    this.tagService.getTags();
    this.user = <User>this.authService.isLoggedIn();
    this.userProfileService.getUserProfile(this.user.username).subscribe(profile => {
      this.userProfileData = new UserProfile(
        profile.username,
        profile.user_avatar,
        profile.score,
        profile.no_of_bronze_badges,
        profile.no_of_silver_badges,
        profile.no_of_gold_badges);
      console.log('user profila data', this.userProfileData);
      this.sgService.userProfileData = this.userProfileData;
    });


  }

  onCreatePostClick() {
    if (this.srcWidth <= 576) {
      const dialogRef = this.dialog.open(CreatePostComponent, {
        maxWidth: '98vw',
        width: '95%',
        data: null,
      });
      // } else if (this.srcWidth <= 1500) {
      //   const dialogRef = this.dialog.open(CreatePostComponent, {
      //     maxWidth: '95vw',
      //     width: '80%',
      //     data: null,
      //   });
    } else {
      const dialogRef = this.dialog.open(CreatePostComponent, {
        maxWidth: '98vw',
        width: '1200px',
        data: null,
        panelClass: 'create-new-post',

      });
    }
  }
}
