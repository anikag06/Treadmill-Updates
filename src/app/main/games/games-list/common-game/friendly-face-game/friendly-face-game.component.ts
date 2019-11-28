import { Component, OnInit, HostListener } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import { FFGameUserData, FFGamePerformance } from '@/main/games/shared/game-play.model';
import { LoadFilesService } from '@/main/games/shared/load-files.service';

declare var ffGamePreloadImages: any;
declare var ffGame_hostile_images: any;
declare var ffGame_friendly_images: any;

declare var getFFGClickData: any;

declare var getFFGUser: any;
declare var ffg_music_notes_array: any;
declare var ffg_music_note_rate_array: any;
declare var ffg_music_order_array: any;
declare var ffg_music_name_array: any;

declare var ffg_last_music_order: number;

declare var ffg_coins: number;

@Component({
  selector: 'app-friendly-face-game',
  templateUrl: './friendly-face-game.component.html',
  styleUrls: ['./friendly-face-game.component.scss']
})
export class FriendlyFaceGameComponent implements OnInit {

  NO_IMAGES_IN_PAGE = 20;
  NO_SONGS_IN_PAGE = 2;
  ffGameMusicOrder!: number;
  no_of_songs!: number;

  constructor(
    private gamePlayService: GamePlayService,
    private gamesAuthService: GamesAuthService,
    private loadFileService: LoadFilesService,
  ) { }

  ffgUserOrderData = new FFGameUserData(0, 0);
  ffgUserPerformane = new FFGamePerformance(1, 0, 'touch', 0, 0);

  ngOnInit() {
    this.loadFileService.loadExternalScript("./assets/games/friendly-face-game/js/facegame_javascript.js").then(() => {}).catch(() => {});
    this.loadFileService.loadExternalScript("./assets/games/friendly-face-game/js/tone.min.js").then(() => {}).catch(() => {});
    this.loadImages();
  }

  loadImages() {
    this.ffGameGetGameData();
    this.ffGameGetImages(1);
  }

  ffGameGetImages(pageNumber: number) {
    this.gamesAuthService.ffGameGetFriendlyImages(pageNumber, this.NO_IMAGES_IN_PAGE)
      .subscribe( (friendly_images) => {
        let i = 0;
        while (friendly_images.results[i]) {
          ffGame_friendly_images.push(friendly_images.results[i].image);
          i++;
        }
        ffGamePreloadImages(1, i);
        this.ffGameGetHostileImages(1);

        if (friendly_images.next != null) {
          pageNumber = pageNumber + 1;
          this.ffGameGetImages(pageNumber);
        }
      });
  }
  ffGameGetHostileImages(pageNumber: number) {
    this.gamesAuthService.ffGameGetHostileImages(pageNumber, this.NO_IMAGES_IN_PAGE)
    .subscribe((hostile_images) => {
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
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  ffGameGetGameData() {
    this.gamesAuthService.ffGameGetUserInfo(1)
      .subscribe((user_data) => {
        this.ffGameMusicOrder = user_data.last_order;
        ffg_coins = user_data.coins;
        this.ffGameMusicData(1);          // start calling the data of music from page no. 1 as data received is according to user order
      });
  }
  ffGameMusicData(pageNumber: number) {
    this.gamesAuthService.ffGameGetMusicInfo(pageNumber, this.NO_SONGS_IN_PAGE)
    .subscribe( (music_data) => {
      this.no_of_songs = music_data.count;
      let i = 0;
      while (music_data.results[i]) {
        const music_notes = music_data.results[i].notes;
        const music_notes_json = JSON.parse(music_notes);
        ffg_music_notes_array.push(music_notes_json);
        ffg_music_order_array.push(music_data.results[i].order);
        ffg_music_note_rate_array.push(music_data.results[i].note_rate);
        ffg_music_name_array.push(music_data.results[i].name);
        i++;
      }
      if (music_data.next != null) {
        pageNumber++;
        this.ffGameMusicData(pageNumber);
      } else if ( music_data.next == null) {
        ffg_last_music_order = music_data.results[i - 1].order;
      }
    });
  }

  @HostListener('window:FFGUserInfoUpdate')
  onSongComplete() {
    this.ffGameUpdateUserInfo();
  }
  ffGameUpdateUserInfo() {
    const ffg_user = getFFGUser();
    this.ffgUserOrderData.coins = ffg_user[0];
    if (ffg_user[1] >= (ffg_last_music_order - 1)) {
      this.ffgUserOrderData.last_order = 0;
      this.ffGameMusicData(1);
    } else {
      this.ffgUserOrderData.last_order = ffg_user[1];
    }
    this.gamesAuthService.ffGameStoreUserInfo(this.ffgUserOrderData)
      .subscribe();
  }

  @HostListener('window:FFGUserPerformanceUpdate')
  onPerformanceDataUpdate() {
    this.ffGameUpdateUserPerformance();
  }
  ffGameUpdateUserPerformance() {
    const performanceData = getFFGClickData();
    this.ffgUserPerformane.grid_rows  = performanceData[0];
    this.ffgUserPerformane.order  = performanceData[1];
    this.ffgUserPerformane .no_of_positive_images = performanceData[2];
    this.ffgUserPerformane.total_time_taken = performanceData[3];
    this.ffgUserPerformane.device_type = performanceData[4];

    this.gamesAuthService.ffGameStorePerformance(this.ffgUserPerformane)
      .subscribe(
      );
  }
}
