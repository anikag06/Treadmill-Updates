import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { SlideService } from '../slide.service';

@Component({
  selector: 'app-slides-video',
  templateUrl: './slides-video.component.html',
  styleUrls: ['./slides-video.component.scss'],
})
export class SlidesVideoComponent implements OnInit, AfterViewInit {
  sanitizedUrl!: SafeUrl;
  videoUrl =
    'https://www.youtube.com/embed/k5E2AVpwsko?autoplay=1&enablejsapi=1&mute=1';
  player!: any;
  videoTimeLeft = 30;

  @ViewChild('slideVideo', { static: false }) slideVideo!: ElementRef;
  @ViewChild('backBtn', { static: false }) backBtn!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<SlidesVideoComponent>,
    private sanitizer: DomSanitizer,
    private loadFileService: LoadFilesService,
    private slideService: SlideService,
  ) { }


  ngAfterViewInit() {
    this.loadFileService.loadExternalScript(
      'https://www.youtube.com/iframe_api',
    );
  }
  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      console.log('you tube iframe');
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
          },
        });
      }, 1000);
    };
    this.slideService.highlightBtn.subscribe(() => {
      this.backBtn.nativeElement.setAttribute('mat-flat-button', '');
      this.backBtn.nativeElement.classList.add('back-btn');
    });
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoUrl,
    );
  }

  onPlayerReady(event: any) {
    console.log('player ready');
    console.log('video time', this.player.getDuration());

    const videoInt = setInterval(() => {
      console.log('current time', this.player.getCurrentTime());
      console.log('duration left', this.player.getDuration() - this.videoTimeLeft);
      if (
        this.player.getCurrentTime() >=
        this.player.getDuration() - this.videoTimeLeft
      ) {
        this.slideService.highlightBtn.emit();
        clearInterval(videoInt);
      }
    }, 1000);
    console.log('back btn', this.backBtn.nativeElement);

  }

  onPlayerStateChange(event: any) {
    console.log('player state');
  }

  onBack() {
    this.dialogRef.close();
  }
}
