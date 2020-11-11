import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import {
  FFGameUserData,
  FFGamePerformance,
} from '@/main/games/shared/game-play.model';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { FfgNextgameComponent } from './ffg-nextgame/ffg-nextgame.component';
import { FfgInstructionsComponent } from './ffg-instructions/ffg-instructions.component';
import { FfgPlayagainComponent } from './ffg-playagain/ffg-playagain.component';
import { FfgNolifeComponent } from './ffg-nolife/ffg-nolife.component';
import { BadgesInfo } from '@/main/games/shared/game-badges.model';
import { GamesBadgesService } from '@/main/games/shared/games-badges.service';
import { FfgHelpService } from './ffg-help.service';
import { GamesFeedbackComponent } from '../games-feedback/games-feedback.component';
import { GamesFeedbackService } from '../games-feedback/games-feedback.service';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { map, switchMap } from 'rxjs/operators';

declare var ffGamePreloadImages: any;
declare var ffGame_hostile_images: any;
declare var ffGame_friendly_images: any;
// declare var ffg_total_images_clicked: any;

declare var getFFGClickData: any;

declare var getFFGUser: any;
declare var ffg_music_notes_array: any;
declare var ffg_music_note_rate_array: any;
declare var ffg_music_order_array: any;
declare var ffg_music_name_array: any;

declare var ffg_last_music_order: number;

declare var ffg_coins: number;
declare var ffg_time_per_note: number;
declare var ffgMusicBarValue: number;
declare var ffgDifficultyValue: number;
declare var ffg_total_positive_images: any;
declare var ffg_perf_update: boolean;
declare var ffg_current_song_order: number;
declare var ffg_timers: any;
declare var ffg_timer: any;
declare var ffg_show_tutorial: boolean;
declare var ffg_ask_feedback: boolean;
@Component({
  selector: 'app-friendly-face-game',
  templateUrl: './friendly-face-game.component.html',
  styleUrls: ['./friendly-face-game.component.scss'],
})
export class FriendlyFaceGameComponent implements OnInit, OnDestroy {
  constructor(
    private gamePlayService: GamePlayService,
    private gamesAuthService: GamesAuthService,
    private loadFileService: LoadFilesService,
    private dialogBoxService: DialogBoxService,
    private badgesService: GamesBadgesService,
    public viewContainerRef: ViewContainerRef,
    private ffgHelpService: FfgHelpService,
    private gamesFeedbackService: GamesFeedbackService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
  ) {}
  NO_IMAGES_IN_PAGE = 20;
  NO_SONGS_IN_PAGE = 2;
  ffGameMusicOrder!: number;
  no_of_songs!: number;
  musicBarValue!: number;
  toneBarValue!: number;
  difficultyBarValue!: number;

  // badges info
  BRONZE_CONSTANT!: any;
  SILVER_CONSTANT!: any;
  GOLD_CONSTANT!: any;
  bronzeValue!: any;
  silverValue!: any;
  goldValue!: any;
  bronzeNumber!: number;
  silverNumber!: number;
  goldNumber!: number;
  no_correct_responses!: number;
  allBadgesInfo: BadgesInfo = new BadgesInfo(0, 0, 0, 0, 0, 0);
  last_completed_order: any;
  show_tutorial!: boolean;
  ffg_show_tutorial = false;

  time_per_note: any;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  showLoading = true;

  @ViewChild('newElement', { static: false }) element!: ElementRef;
  @Output() showPlayButtons = new EventEmitter();

  ffgUserOrderData = new FFGameUserData(0, 0, 0);
  ffgUserPerformance = new FFGamePerformance(1, 0, 'touch', 0, 0, false);

  @HostListener('window:CallPlayNext')
  openPlayNextPopup() {
    this.dialogBoxService.setDialogChild(FfgNextgameComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('window:showInstructions')
  openShowInstructionsPopup() {
    this.dialogBoxService.setDialogChild(FfgInstructionsComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('window:Playagain')
  openPlayagainPopup() {
    this.dialogBoxService.setDialogChild(FfgPlayagainComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('window:FFGNoLife')
  openNoLifePopup() {
    this.dialogBoxService.setDialogChild(FfgNolifeComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }
  @HostListener('window:Feedback')
  openFeedbackPopup() {
    if (ffg_ask_feedback) {
      this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      this.element.nativeElement.dispatchEvent(domEvent);
    }
  }
  @HostListener('window:diffBarUpdate')
  diffBarUpdate() {
    this.difficultyBarValue = ffgDifficultyValue;
    console.log('barwidth set in angular');
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
    this.loadFileService
      .loadExternalScript(
        './assets/games/friendly-face-game/js/facegame_javascript.js',
      )
      .then(() => {
        this.loadImages();
      })
      .catch(() => {});
    this.loadFileService
      .loadExternalScript('./assets/games/friendly-face-game/js/tone.min.js')
      .then(() => {})
      .catch(() => {});
    this.gamePlayService.ffgameScriptLoaded = true;

    this.ffgHelpService.updateBadges.subscribe(() => {
      this.updateBadgesValue();
      console.log('updating badges');
    });
    this.gamesFeedbackService.feedback.subscribe(() => {
      this.openPlayNextPopup();
    });
  }

  ngOnDestroy(): void {
    if (ffg_timers) {
      ffg_timers.forEach(() => {
        clearInterval(ffg_timer);
      });
    }
  }

  loadImages() {
    this.ffGameGetGameData();
    this.ffGameGetImages(1);
    this.ffGameGetHostileImages(1);
  }

  @HostListener('window:getFriendlyImages')
  ffGameGetImages(pageNumber: number = 1) {
    this.gamesAuthService
      .ffGameGetFriendlyImages(pageNumber, this.NO_IMAGES_IN_PAGE)
      .subscribe(friendly_images => {
        let i = 0;
        while (friendly_images.results[i]) {
          ffGame_friendly_images.push(friendly_images.results[i].image);
          i++;
        }
        ffGamePreloadImages(1, i);
        if (friendly_images.next != null) {
          pageNumber = pageNumber + 1;
          this.ffGameGetImages(pageNumber);
        }
      });
  }

  @HostListener('window:getHostileImages')
  ffGameGetHostileImages(pageNumber: number = 1) {
    this.gamesAuthService
      .ffGameGetHostileImages(pageNumber, this.NO_IMAGES_IN_PAGE)
      .subscribe(hostile_images => {
        let j = 0;
        while (hostile_images.results[j]) {
          ffGame_hostile_images.push(hostile_images.results[j].image);
          j++;
        }
        ffGamePreloadImages(0, j);
        if (hostile_images.next != null) {
          pageNumber = pageNumber + 1;
          this.ffGameGetHostileImages(pageNumber);
        }
      });
  }
  ffGameGetGameData() {
    this.gamesAuthService.ffGameGetUserInfo().subscribe(user_data => {
      console.log('user data', user_data);
      this.no_correct_responses = user_data.total_positive_images;
      this.ffGameMusicOrder = user_data.last_order;
      ffg_coins = user_data.score; // user score
      this.BRONZE_CONSTANT = user_data.BRONZE_CONSTANT;
      this.SILVER_CONSTANT = user_data.SILVER_CONSTANT;
      this.GOLD_CONSTANT = user_data.GOLD_CONSTANT;
      this.last_completed_order = user_data.last_completed_order;
      this.ffgHelpService.show_tutorial = user_data.show_tutorial;
      ffg_ask_feedback = user_data.ask_for_feedback;
      ffg_time_per_note = user_data.time_per_note; // timeAlloted in miliseconds
      ffg_total_positive_images = user_data.total_positive_images;
      this.ffGameMusicData(); // start calling the data of music from page no. 1 as data received is according to user order
      this.updateBadgesValue();
    });
  }
  // ffGameMusicData(pageNumber: number) {
  //   this.gamesAuthService.ffGameGetMusicInfo(pageNumber, this.NO_SONGS_IN_PAGE)
  //   .subscribe( (music_data) => {
  //     console.log(music_data);
  //     this.no_of_songs = music_data.count;
  //     let i = 0;
  //     while (music_data.results[i]) {
  //       const music_notes = music_data.results[i].notes;
  //       const music_notes_json = JSON.parse(music_notes);
  //       ffg_music_notes_array.push(music_notes_json);
  //       ffg_music_order_array.push(music_data.results[i].order);
  //       ffg_music_note_rate_array.push(music_data.results[i].note_rate);
  //       ffg_music_name_array.push(music_data.results[i].name);
  //       i++;
  //     }
  //     if (music_data.next != null) {
  //       pageNumber++;
  //       this.ffGameMusicData(pageNumber);
  //     } else if ( music_data.next == null) {
  //       ffg_last_music_order = music_data.results[i - 1].order;
  //     }
  //   });
  // }

  @HostListener('window:FFGUpdateMusic')
  onMusicUpdate() {
    this.last_completed_order = ffg_current_song_order;
    this.ffGameMusicData();
  }
  ffGameMusicData() {
    this.gamesAuthService
      .ffGameGetMusicInfo(this.last_completed_order)
      .subscribe(music_data => {
        const music_notes = music_data.notes;
        const music_notes_json = JSON.parse(music_notes);
        ffg_music_notes_array.push(music_notes_json);
        ffg_music_order_array.push(music_data.order);
        ffg_music_note_rate_array.push(music_data.note_rate);
        ffg_music_name_array.push(music_data.name);
        ffg_current_song_order = music_data.order;
        console.log(
          'music_data, CURRENT SONG ORDER',
          ffg_current_song_order,
          this.last_completed_order,
          music_data,
        );
      });
  }

  @HostListener('window:FFGUserInfoUpdate')
  onSongComplete() {
    this.ffGameUpdateUserInfo();
  }
  ffGameUpdateUserInfo() {
    const ffg_user = getFFGUser();
    this.ffgUserOrderData.score = ffg_user[0];
    // if (ffg_user[1] >= (ffg_last_music_order - 1)) {
    //   this.ffgUserOrderData.last_completed_order = 0;
    //   this.ffGameMusicData();
    // } else {
    this.ffgUserOrderData.last_completed_order = ffg_user[1];

    // }
    this.ffgUserOrderData.time_per_note = ffg_user[2];
    this.gamesAuthService
      .ffGameStoreUserInfo(this.ffgUserOrderData)
      .subscribe();
  }

  @HostListener('window:FFGUserPerformanceUpdate')
  onPerformanceDataUpdate() {
    this.ffGameUpdateUserPerformance();
  }
  ffGameUpdateUserPerformance() {
    const performanceData = getFFGClickData();
    this.ffgUserPerformance.grid_rows = performanceData[0];
    this.ffgUserPerformance.order = performanceData[1];
    this.ffgUserPerformance.no_of_positive_images = performanceData[2];
    this.ffgUserPerformance.total_time_taken = performanceData[3];
    this.ffgUserPerformance.device_type = performanceData[4];
    this.ffgUserPerformance.completed = performanceData[5];
    if (ffg_perf_update) {
      this.gamesAuthService
        .ffGameUpdatePerformance(this.ffgUserPerformance)
        .subscribe();
      ffg_perf_update = false;
      console.log(
        'Post performance order',
        this.ffgUserPerformance.order,
        this.ffgUserPerformance.completed,
      );
    } else {
      this.gamesAuthService
        .ffGameStorePerformance(this.ffgUserPerformance)
        .subscribe();
      console.log(
        'update performance order',
        this.ffgUserPerformance.order,
        this.ffgUserPerformance,
      );
    }
  }

  @HostListener('window:FFGUpdateMusicBar')
  onMusicBarUpdate() {
    this.musicBarValue = ffgMusicBarValue;
    this.toneBarValue = this.musicBarValue * 3.3;
  }

  updateBadgesValue() {
    this.allBadgesInfo = this.badgesService.getBadgesInfo(
      this.BRONZE_CONSTANT,
      this.SILVER_CONSTANT,
      this.GOLD_CONSTANT,
      this.no_correct_responses,
    );
    this.bronzeNumber = this.allBadgesInfo.bronzeBadges;
    if (this.ffgHelpService.bronzeNumber < this.bronzeNumber) {
      this.ffGameUpdateUserPerformance();
    }
    this.silverNumber = this.allBadgesInfo.silverBadges;
    if (this.ffgHelpService.silverNumber < this.silverNumber) {
      this.ffGameUpdateUserPerformance();
    }
    this.goldNumber = this.allBadgesInfo.goldBadges;
    if (this.ffgHelpService.goldNumber < this.goldNumber) {
      this.ffGameUpdateUserPerformance();
    }

    this.bronzeValue = this.allBadgesInfo.bronzePercent;
    this.silverValue = this.allBadgesInfo.silverPercent;
    this.goldValue = this.allBadgesInfo.goldPercent;
    this.ffgHelpService.bronzeNumber = this.bronzeNumber;
    this.ffgHelpService.silverNumber = this.silverNumber;
    this.ffgHelpService.goldNumber = this.goldNumber;
    this.ffgHelpService.bronzeValue = this.bronzeValue;
    this.ffgHelpService.silverValue = this.silverValue;
    this.ffgHelpService.goldValue = this.goldValue;
  }

  @HostListener('window:FFGUpdateBadges')
  updateBadges() {
    this.no_correct_responses = ffg_total_positive_images;
    this.ffgHelpService.updateBadges.emit();
  }
  removeLoading() {
    setTimeout(() => {
      this.showLoading = false;
      this.showPlayButtons.emit();
    }, 100);
  }
}
