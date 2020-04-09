import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { ActivatedRoute, Params } from '@angular/router';
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

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() video!: VideoItem;
  // private subject: any;
  videoId!: number;
  videoTitle!: string;
  videoUrl!: string;
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



  @ViewChild('Video', { static: false }) Video!: ElementRef;
  @ViewChild('playPause', { static: false}) playPause!: ElementRef

  constructor(
    private activatedRoute: ActivatedRoute,
    private extraResourcesService: ExtraResourcesService,
    private sanitizer: DomSanitizer,
    private http: HttpClient, //  private videos: VideosComponent
    private loadFileService: LoadFilesService,
    private elementRef: ElementRef,
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
      //this.elementRef.nativeElement.querySelector('Video').addEventListener('click', console.log('clicked on the video'));





    // this.extraResourcesService.getVideoItem().subscribe((video_data: any) => {
    //   video_data.results.forEach((element: any) => {
    //     this.listOfVideos.push(<VideoItem>element);
    //     this.lengthOfVideoList = this.lengthOfVideoList + 1;
    //     //console.log('list of videos', this.listOfVideos);
    //   });
    //   console.log('list of videos', this.listOfVideos);
    //   // this.lengthOfVideoList = this.listOfVideos.length;
    //   console.log('length', this.lengthOfVideoList);
    // });


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
      // this.isLoaded = true;
      // }
      //   this.extraResourcesService.getVideoItem()
      //     .subscribe((data: any) => {
      //       this.video = <VideoItem>data.id;
      //     });
    } else {
      this.extraResourcesService.videoClickedEvent.subscribe(data => {
        console.log('data: ', data);
        this.video = <VideoItem>data;
        this.isLoaded = true;
        // this.video.url = data.url;
        // this.safeVideoUrl = this.sanitizer.bypassSecurityTrustUrl(this.video.url);
      });
      // this.isLoaded = true;
    }

    // this.extraResourcesService.getVideoItem().subscribe((video_data: any) => {
    //          video_data.results.forEach((element: any) => {
    //            this.listOfVideos.push(<VideoItem>element);
    //            //console.log('list of videos', this.listOfVideos);
    //          });
    //   console.log('list of videos', this.listOfVideos);
    //   this.lengthOfVideoList = this.listOfVideos.length;
    //   console.log('length', this.lengthOfVideoList);
    //        });
  }
      createPlayer(){
     // (<any>window).onYouTubeIframeAPIReady = () => {
        console.log('you tube iframe');
        console.log('player is:', this.player);
        setTimeout(() => {
          //for (let j = 1; j  this.lengthOfVideoList; j++) {

          this.player = new (<any>window).YT.Player('player', {
            events: {
              onReady: (event: any) => {
                this.onPlayerReady(event);
               // this.player.addEventListener('click', this.playPauseToggle(event));
              },
              onStateChange: (event: any) => {
                this.onPlayerStateChange(event);
                this.eventDataForPlayPause = event.data;

              //  this.playPauseToggle(event);
              },
            },
            playerVars: {
              autoplay: 1,
              origin: window.location.href,
            },
          });//}
        }, 1000);
     // };
    }

  //}


  //   (<any>window).onYouTubeIframeAPIReady = () => {
  //     this.extraResourcesService.getVideoItem().subscribe((video_data: any) => {
  //       video_data.results.forEach((element: any) => {
  //         this.listOfVideos.push(<VideoItem>element);
  //         //console.log('list of videos', this.listOfVideos);
  //       });
  //     });
  //     // for (let i = 0; i < this.listOfVideos.length; i++) {
  //     //
  //     // console.log('you tube iframe');
  //     // }
  //     setTimeout(() => {
  //
  //       this.player = new (<any>window).YT.Player('player', {
  //         events: {
  //           onReady: (event: any) => {
  //             console.log('ready fired');
  //             this.onPlayerReady(event);
  //           },
  //           onStateChange: (event: any) => {
  //             console.log('state change fired');
  //             this.onPlayerStateChange(event);
  //           },
  //         },
  //         playerVars: {
  //           autoplay: 1,
  //           origin: window.location.href,
  //           // controls: 1,
  //         },
  //       });
  //
  //
  //     }, 1000);
  //     //}
  //     };
  // }


  onPlayerReady(event: any) {
    //this.eventDataForPlayPause = event.data;
    console.log('player ready');
    console.log('video time', this.player.getDuration());

    //document.addEventListener('click', console.log('play pause'));

     this.videoInt = setInterval(() => {
       console.log('current time', this.player.getCurrentTime());
      if ((
        this.player.getCurrentTime() >=
        this.player.getDuration() - this.videoTimeLeft) //|| (this.id !==  this.videoIdToSend)
      ) {
        clearInterval(this.videoInt);
        console.log('new url', '/extra-resources/videoItem/' + this.videoIdToSend);
        this.watched = true;
        console.log('watched');
        this.extraResourcesService.markVideoWatched(this.videoIdToSend, this.watched).subscribe((data: any) => {
          console.log('marked video data', data);
        });


        // console.log('marking', this.videoIdToSend, this.watched);
       // this.enableBackBtn();
         }
      //else {
       //  //console.log('timer is still going on');
       //  if (this.activeUrl !== '/extra-resources/videoItem/' + this.videoIdToSend){
       //    console.log('extra-resources/videoItem/',this.videoIdToSend);
       //    console.log('clear interval due to change link');
       //    //clearInterval(videoInt);
       //
       //
       //  }
      //}
      // if (this.activeUrl !== '/extra-resources/videoItem/' + this.videoIdToSend){
      //   console.log('new url', '/extra-resources/videoItem/' + this.videoIdToSend);
      //   clearInterval(videoInt);
      // }

      // else {
       //  this.activatedRoute.url.subscribe(activeUrl => {
       //    this.activeUrl = window.location.pathname;})
       //    console.log('activeUrl ', this.activeUrl);
       //   if (this.activeUrl === '/extra-resources') {
       //     (<any>window).onYouTubeIframeAPIReady = null;
       //     this.player = null;
       //     console.log('exit');
       //
       //   }}// else {
      //   this.player = null;
      // }
    }, 1000);

  }
  onPlayerStateChange(event: any) {
    console.log('player state');
    if (event.data === 0){
      console.log('event data', event.data);}
  }

  playPauseToggle(event: any){
    console.log('play pause toggle');
    console.log('event', this.eventDataForPlayPause);
     if (this.eventDataForPlayPause === 1) {
       this.player.pauseVideo();
       console.log('paused');
    // }
    //  // event.data = 2;
    //   console.log('player data data', event);
    //   //this.player.PlayerState = 2;
    //   console.log('click to pause', event.data);
     } else {
       if (this.eventDataForPlayPause === 2) {
         this.player.playVideo();
         console.log('played');
       }
    //     event.data = 1;
    //     console.log('click to play');
       }
    // }
  }

   ngOnDestroy() {
     (<any>window).onYouTubeIframeAPIReady = null;
     if (this.player) {
       clearInterval(this.videoInt);
       //this.player.destroy();
      // this.player = null;
       //clearInterval(this.videoInt)
       console.log('destroyed');
       console.log('player after destroying', this.player);
       //this.createPlayer().destroy();

     }
   }


  // ngOnDestroy() {
  //   (<any>window).onYouTubeIframeAPIReady = null;
  //   if (!this.player) {
  //     console.log('Player could not be found.');
  //   } else {
  //     console.log(this.player);
  //     // this.player.pauseVideo();
  //     // this.player.destroy();
  //     this.player = null;
  //     console.log('destroyed');
  //   }
  // }

  // onVideoClick() {
  //
  //   if (this.duration === this.timePlayed){
  //     this.watched = true;
  //   }
  // }
  //
  // videoStartedPlaying() {
  //   this.timeStarted = (new Date().getTime()) / 1000;
  // }
  //
  // videoStoppedPlaying() {
  //   // Start time less then zero means stop event was fired vidout start event
  //   if (this.timeStarted > 0) {
  //     this.playedFor = new Date().getTime() / 1000 - this.timeStarted;
  //     this.timeStarted = -1;
  //     // add the new ammount of seconds played
  //     this.timePlayed += this.playedFor;
  //     this.timePlayed = Math.round(this.timePlayed);
  //   }
  // }
  //
  //   getDuration(video: VideoItem['url']) {
  //     this.duration = video.duration;
  //     //document.getElementById("duration").appendChild(new Text(Math.round(duration)+""));
  //     console.log("Duration: ", this.duration);
  //   }
}
