import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VideoItem } from '@/main/resources2/shared/video.model';
import { Observable } from 'rxjs';
import { ReadingItem } from '@/main/resources2/shared/reading.model';
import { Resources2Service } from '@/main/resources2/resources2.service';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resources2',
  templateUrl: './resources2.component.html',
  styleUrls: ['./resources2.component.scss'],
  providers: [Resources2Service],
})
export class Resources2Component implements OnInit {
  videoItems: VideoItem[] = [];
  readingItem: ReadingItem[] = [];
  videoLink: string | undefined;
  videoId: number | undefined;
  videoTitle: string | undefined;
  videoUrl: string | undefined;
  notOn = true;
  // z: VideoItem | undefined;

  constructor(
    private resources2Service: Resources2Service,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.resources2Service.getVideoItem().subscribe((video_data: any) => {
      console.log('video url', video_data);
      // console.log('hi', video_data.data.results);
      // this.videoId = video_data.id;
      // this.videoTitle = video_data.title;
      //    this.videoUrl = elements.url;
      // console.log(video_data.forEach(video_data.id));

      video_data.results.forEach((element: any) => {
        console.log('element: ', element);
        this.videoItems.push(<VideoItem>element);
        console.log('video list: ', this.videoItems);

        // this.videoId = element.id;
        // this.videoTitle = element.title;
        // this.videoUrl = element.url;
        // this.videoItem.id = elements.id;
        // this.videoItem.title =
        // });
        //
      });
      //  for(const i = 0; i < video_data.videos.length;i++){
      //    console.log(video_data.videos[i].id);
      //
      //  }
      //this.videoLink = data.url;
    });
  }
  videoClick(videoBeingClicked: VideoItem) {
    this.router.navigate(['videoItem/', videoBeingClicked.id], { relativeTo: this.route });
    // videoBeingClicked = <VideoItem>this.videoItem;
    console.log('video loading', videoBeingClicked);
    setTimeout(() => {
      this.resources2Service.event1.next([1, 'hello', 'hi']);

    }, 1000);
     // this.resources2Service.event1.onNext([1, 'hello', 'hi']);
   // this.resources2Service.callBehavior(videoBeingClicked);
  }
  // go() {
  //   this.resources2Service.getVideoDetail();
  // }
}
