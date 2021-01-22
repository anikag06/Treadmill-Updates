import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { SlideService } from '../slide.service';
import { CommonService } from '@/shared/common.service';
import { MEDITATION_COMPLETE_SCORE } from '@/app.constants';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-slides-video',
  templateUrl: './slides-video.component.html',
  styleUrls: ['./slides-video.component.scss'],
})
export class SlidesVideoComponent implements OnInit, AfterViewInit {
  user!: User;
  sanitizedUrl!: SafeUrl;
  videoUrl!: String;

  player!: any;
  videoTimeLeft = 10;
  backBtnTxt!: string;
  instruction!: string;
  fromChatbot!: boolean;

  @ViewChild('slideVideo', { static: false }) slideVideo!: ElementRef;
  @ViewChild('backBtn', { static: false }) backBtn!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<SlidesVideoComponent>,
    private sanitizer: DomSanitizer,
    private loadFileService: LoadFilesService,
    private slideService: SlideService,
    private commonService: CommonService,
    private authService: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.videoUrl = data.videoUrl;
      this.backBtnTxt = data.btnText;
      this.instruction = data.instruction;
      this.fromChatbot = data.fromChatbot;
    }
  }

  ngAfterViewInit() {
    this.loadFileService.loadExternalScript(
      'https://www.youtube.com/iframe_api',
    );
  }
  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      setTimeout(() => {
        this.player = new (<any>window).YT.Player('player', {
          events: {
            onReady: (event: any) => {
              this.onPlayerReady(event);
            },
            onStateChange: (event: any) => {
              this.onPlayerStateChange(event);
            },
          },
          playerVars: {
            autoplay: 1,
            origin: window.location.href,
            enablejsapi: 1,
          },
        });
      }, 1000);
    };
    if (!this.fromChatbot) {
      this.videoUrl = this.slideService.videoUrl_1 + '?enablejsapi=1';
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.slideService.videoUrl_1 + '?enablejsapi=1',
      );
    } else {
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.videoUrl + '?enablejsapi=1',
      );
    }

    this.slideService.highlightBtn.subscribe(() => {
      this.backBtn.nativeElement.setAttribute('mat-flat-button', '');
      this.backBtn.nativeElement.classList.add('back-btn');
    });
    this.user = <User>this.authService.isLoggedIn();
  }

  onPlayerReady(event: any) {
    event.target.playVideo();

    const videoInt = setInterval(() => {
      if (
        this.player.getCurrentTime() >=
        this.player.getDuration() - this.videoTimeLeft
      ) {
        this.slideService.highlightBtn.emit();
        clearInterval(videoInt);
      }
    }, 1000);
  }

  onPlayerStateChange(event: any) {}

  onBack() {
    this.dialogRef.close();
    if (!this.fromChatbot) {
      this.commonService.updateScore(MEDITATION_COMPLETE_SCORE);
    }
  }

  showThreeMinVideo() {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.slideService.videoUrl_3 + '?enablejsapi=1',
    );
  }

  showFiveMinVideo() {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.slideService.videoUrl_5 + '?enablejsapi=1',
    );
  }
}
