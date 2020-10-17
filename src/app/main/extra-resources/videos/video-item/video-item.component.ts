import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { VideosComponent } from '@/main/extra-resources/videos/videos.component';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { MindfulnessVideoItem } from '@/main/extra-resources/shared/mindfulnessVideo.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() video!: VideoItem;
  @Input() mindfulnessVideo!: MindfulnessVideoItem;
  @Input() videoType!: string;

  // private subject: any;
  idAtEndOfUrl!: number;
  mindfulnessVideoId!: number;
  mindfulnessVideoTitle!: string;
  mindfulnessVideoUrl!: string;
  // safeVideoUrl!: SafeUrl;
  videoIdToSend!: number;
  isLoaded = false;
  timeStarted = -1;
  timePlayed = 0;
  duration = 0;
  playedFor: number | undefined;
  watched = false;
  player!: any;
  videoTimeLeft = 10;
  enableId = '?enablejsapi=1';
  listOfVideos: VideoItem[] = [];
  lengthOfVideoList = this.listOfVideos.length;
  playOn = false;
  activeUrl: string | undefined;
  id: number | undefined;
  videoInt: any;
  eventDataForPlayPause: number | undefined;
  eachVideoType!: string;
  eachVideoType2!: string;

  @ViewChild('Video', { static: false }) Video!: ElementRef;
  @ViewChild('playPause', { static: false }) playPause!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private extraResourcesService: ExtraResourcesService,
    private sanitizer: DomSanitizer,
    private http: HttpClient, //  private videos: VideosComponent
    private loadFileService: LoadFilesService,
    private elementRef: ElementRef,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    this.loadFileService.loadExternalScript(
      'https://www.youtube.com/iframe_api',
    );
  }

  init() {
    if ((<any>window).YT) {
      this.createPlayer();
      return;
    }

    (<any>window).onYouTubeIframeAPIReady = () => this.createPlayer();
  }

  ngOnInit() {
    this.init();

    if (this.router.url.includes('/extra-resources/mindfulnessVideo/')) {
      console.log('id at end');
      this.eachVideoType = 'mindfulnessVideo';
      if (this.mindfulnessVideo == null) {
        this.activatedRoute.params.subscribe(data => {
          this.videoIdToSend = data.id;
          console.log('reload id:', data.id);
        });
        this.extraResourcesService
          .getAMindfulnessVideo(this.videoIdToSend)
          .subscribe((data: any) => {
            console.log('data', data.resource_video.url);
            this.mindfulnessVideo = <MindfulnessVideoItem>data;
            this.isLoaded = true;
          });
      } else {
        this.extraResourcesService.mindfulnessVideoClickedEvent.subscribe(
          data => {
            this.mindfulnessVideo = <MindfulnessVideoItem>data;
            this.isLoaded = true;
            console.log('mindfulness video', data);
          },
        );
      }
    }

    if (this.router.url.includes('/extra-resources/videoItem/')) {
      console.log('id at end');
      this.eachVideoType = 'video';
      if (this.video == null) {
        this.activatedRoute.params.subscribe(data => {
          this.videoIdToSend = data.id;
          console.log('reload id:', data.id);
        });
        this.extraResourcesService
          .getAVideo(this.videoIdToSend)
          .subscribe(data => {
            console.log('data', data);
            this.video = <VideoItem>data;
            this.isLoaded = true;
          });
      } else {
        this.extraResourcesService.videoClickedEvent.subscribe(data => {
          this.video = <VideoItem>data;
          this.isLoaded = true;
        });
      }
    }
  }
  createPlayer() {
    console.log('you tube iframe');
    console.log('player is:', this.player);
    setTimeout(() => {
      this.player = new (<any>window).YT.Player('player', {
        events: {
          onReady: (event: any) => {
            this.onPlayerReady(event);
          },
          onStateChange: (event: any) => {
            this.onPlayerStateChange(event);
            this.eventDataForPlayPause = event.data;
          },
        },
        playerVars: {
          autoplay: 1,
          origin: window.location.href,
        },
      }); // }
    }, 1000);
    // };
  }

  onPlayerReady(event: any) {
    console.log('player ready');
    console.log('video time', this.player.getDuration());
    this.videoInt = setInterval(() => {
      console.log('current time', this.player.getCurrentTime());
      if (
        this.player.getCurrentTime() >=
        this.player.getDuration() - this.videoTimeLeft // || (this.id !==  this.videoIdToSend)
      ) {
        clearInterval(this.videoInt);
        console.log(
          'new url',
          '/extra-resources/videoItem/' + this.videoIdToSend,
        );
        this.watched = true;
        console.log('watched');
        this.extraResourcesService
          .markVideoWatched(this.videoIdToSend, this.watched)
          .subscribe((data: any) => {
            console.log('marked video data', data);
          });
      }
    }, 1000);
  }
  onPlayerStateChange(event: any) {
    console.log('player state');
    if (event.data === 0) {
      console.log('event data', event.data);
    }
  }

  playPauseToggle(event: any) {
    console.log('play pause toggle');
    console.log('event', this.eventDataForPlayPause);
    if (this.eventDataForPlayPause === 1) {
      this.player.pauseVideo();
      console.log('paused');
    } else {
      if (this.eventDataForPlayPause === 2) {
        this.player.playVideo();
        console.log('played');
      }
    }
    // }
  }

  ngOnDestroy() {
    (<any>window).onYouTubeIframeAPIReady = null;
    if (this.player) {
      clearInterval(this.videoInt);
      console.log('destroyed');
      console.log('player after destroying', this.player);
    }
  }
}
