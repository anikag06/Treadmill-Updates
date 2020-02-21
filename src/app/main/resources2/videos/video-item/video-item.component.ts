import {Component, Input, OnInit} from '@angular/core';
import {VideoItem} from '@/main/resources2/shared/video.model';
import {ActivatedRoute} from '@angular/router';
import {Resources2Service} from '@/main/resources2/resources2.service';
import {VideosComponent} from '@/main/resources2/videos/videos.component';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
   providers: [Resources2Service]
})
export class VideoItemComponent implements OnInit {
  @Input() video!: VideoItem;
 // private subject: any;


  constructor(
    private route: ActivatedRoute,
    private resources2Service: Resources2Service,
  //  private videos: VideosComponent
  ) { }

  ngOnInit() {
   // this.resources2Service.getVideoDetail(this.video);
   // this.video = this.resources2Service.getVideo();
     this.resources2Service.event1
       .subscribe((data) => {
         console.log('clicked video', data);
         this.video = <VideoItem>data;
        // this.subject.next(this.video);

       });


    // this.video =
    // this.route.params
    //   .subscribe((data) => {
    //     console.log('each video data is', data);
    //     this.video = <VideoItem>data;
    //     console.log('id of video is', this.video.id);

       // this.video.title = data['title'];
        // console.log('video title', this.video.title);
     // });
    // this.video = {
    // id: this.route.snapshot.params['id'];
    // }
    // console.log('id is', this.video.id);

  }

//  this.resources2Service.getVideoDetail
  // onVideoItem(videoItem: VideoItem){
  //   this.video = <VideoItem>videoItem;
  //
  // }
}
