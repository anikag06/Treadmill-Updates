import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import {MindfulnessVideoItem} from '@/main/extra-resources/shared/mindfulnessVideo.model';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  @Input() videoItem!: VideoItem;
  @Input() mindfulnessVideoItem!: MindfulnessVideoItem;
  @Input() videoType!: string;
  videoLink: string | undefined;
  videoFooter: string | undefined;
  // @Output() event1 = new EventEmitter();
  showState = false;
  bodyLength = 60;

  notOn = true;
  //  @Output() onVideoEvent=  new EventEmitter();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private extraResourcesService: ExtraResourcesService,
  ) {}

  ngOnInit() {
    // this.http.get<VideoItem>('').subscribe((data) => {
    //   this.getVideo(data);
    //   this.videoClick(data.url);
    //
    // });
  }

  //   getVideo(video: VideoItem) {
  //     this.videoLink = video.url;
  //     this.videoFooter = video.title;
  // }
  //   videoClick(videoLink: string) {
  //     this.router.navigateByUrl('string');
  //   }
  // videoItems: any;
  // videoClick() {
  //   this.router.navigate(['videoItem/', this.videoItem.id], {relativeTo: this.route});
  //   // x = <VideoItem>this.videoItem;
  //   console.log('video loading');
  //   // this.event1.emit();
  //
  // }

  // giveVideoDetail(x: VideoItem){
  //   x = <VideoItem>this.videoItem;
  // }

  // redirect(){
  // this.extraResourcesService.videoGo();
  // }
  expandLine() {
    this.showState = true;
  }
}
