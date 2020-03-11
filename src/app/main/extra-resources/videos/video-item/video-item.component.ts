import { Component, Input, OnInit } from '@angular/core';
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
export class VideoItemComponent implements OnInit {
  @Input() video!: VideoItem;
  // private subject: any;
  videoId!: number;
  videoTitle!: string;
  videoUrl!: string;
  //safeVideoUrl!: SafeUrl;
  videoIdToSend!: number;
  isLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private extraResourcesService: ExtraResourcesService,
    private sanitizer: DomSanitizer,
    private http: HttpClient, //  private videos: VideosComponent
  ) {}

  ngOnInit() {
    if (this.video == null) {
      this.activatedRoute.params.subscribe(data => {
        this.videoIdToSend = data.id;
        console.log('reload id:', data.id);
      });
      this.extraResourcesService
        .getAVideo(this.videoIdToSend)
        .subscribe(data => {
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
        //this.video.url = data.url;
        //this.safeVideoUrl = this.sanitizer.bypassSecurityTrustUrl(this.video.url);
      });
      // this.isLoaded = true;
    }

    // this.extraResourcesService.getVideoDetail(this.video);
    // this.video = this.extraResourcesService.getVideo();
    // this.extraResourcesService.event1.next([1, 'welcome', 'world']);
    //  this.activatedRoute.params // to execute******
    //    .subscribe((data) => {
    //      console.log('through route', data);
    //      this.videoId = data.id;
    //      this.videoTitle = data.title;
    //      this.videoUrl = data.url;
    //    });

    // this.extraResourcesService.getEvent1() // to check its execution******
    //   .subscribe((data) => {
    //     console.log('clicked video', <VideoItem>data); });

    // this.route.params            // to execute*****
    //   .subscribe((params) => {
    //     console.log('routing for the id', params);
    //     this.videoId = params;
    //     this.videoTitle = params;
    //   });
    // });

    //   this.extraResourcesService.getParticularVideo(1)
    //     .subscribe((data) =>{
    //     this.video}
    // })

    //   this.extraResourcesService.event1
    //     .subscribe((data) => {
    //       console.log('clicked video', data);
    //       this.video = <VideoItem>data;
    //      // this.subject.next(this.video);
    //
    //     });
    // this.extraResourcesService.event1.next(['2', 'hello', 'world']);

    // this.extraResourcesService.getEvent1().subscribe((data) => {
    //      console.log('clicked video', data);

    //  this.extraResourcesService.getEvent1()
    //    .subscribe((data) => {
    //      console.log('clicked video', data);
    // //     this.video = <VideoItem>data;
    //     // this.subject.next(this.video);
    //
    //   });

    // this.video =
    //   this.route.params
    //     .subscribe((data) => {
    //       console.log('each video data is', data);
    //       });
    //      this.video = <VideoItem>data;
    //      this.videoId = this.video.id;
    //      console.log('id of video is', this.video.id);

    // this.video.title = data['title'];
    // console.log('video title', this.video.title);
    // });
    // this.video = {
    // id: this.route.snapshot.params['id'];
    // }
    // console.log('id is', this.video.id);
  }

  //  this.extraResourcesService.getVideoDetail
  // onVideoItem(videoItem: VideoItem){
  //   this.video = <VideoItem>videoItem;
  //
  // }
}
