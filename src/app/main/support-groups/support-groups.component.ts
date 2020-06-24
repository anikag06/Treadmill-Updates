import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { Subscription } from 'rxjs';
import { IntroService } from '@/main/walk-through/intro.service';

@Component({
  selector: 'app-support-groups',
  templateUrl: './support-groups.component.html',
  styleUrls: ['./support-groups.component.scss'],
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
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private introService: IntroService,
  ) {
    this.titleService.setTitle('Support Group | ' + TREADWILL);
    this.getScreenSize();
  }

  user!: User; // Current User
  userProfileData = new UserProfile('Name', '', 0, 0, 0, 0);
  srcWidth!: any;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  loadingSubscription!: Subscription;
  // fromFlow =false;
  loading = false;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.srcWidth = window.innerWidth;
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(id)),
      )
      .subscribe((res: any) => {
        const step = res.data;
        console.log('RESPONSE', res.data, step.status);
        // for navbar title
        this.stepGroupSequence = step.step_group_sequence + 1;
        this.stepSequence = step.sequence + 1;
        this.stepName = step.name;
        this.navbarTitle =
          this.stepGroupSequence.toString() +
          '.' +
          this.stepSequence.toString() +
          ' ' +
          this.stepName;
        console.log('STEP DETAIL:', this.navbarTitle);
        this.flowService.stepDetail.emit(this.navbarTitle);
      });
    this.tagService.getTags();
    this.user = <User>this.authService.isLoggedIn();
    this.userProfileService
      .getUserProfile(this.user.username)
      .subscribe(profile => {
        this.userProfileData = new UserProfile(
          profile.username,
          profile.user_avatar,
          profile.score,
          profile.no_of_bronze_badges,
          profile.no_of_silver_badges,
          profile.no_of_gold_badges,
        );
        console.log('user profila data', this.userProfileData);
        this.sgService.userProfileData = this.userProfileData;
      });

    this.loadingSubscription = this.introService.loadingBehaviour.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      },
    );
  }

  onCreatePostClick() {
    if (this.srcWidth <= 576) {
      const dialogRef = this.dialog.open(CreatePostComponent, {
        maxWidth: '98vw',
        width: '95%',
        data: null,
      });
    } else if (this.srcWidth <= 1300) {
      const dialogRef = this.dialog.open(CreatePostComponent, {
        maxWidth: '95vw',
        width: '90%',
        data: null,
        panelClass: 'create-new-post',
      });
    } else {
      const dialogRef = this.dialog.open(CreatePostComponent, {
        maxWidth: '98vw',
        width: '1200px',
        data: null,
        panelClass: 'create-new-post',
      });
    }
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
