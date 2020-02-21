import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VideoItem} from '@/main/resources2/shared/video.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Resources2Service} from '@/main/resources2/resources2.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  providers: [Resources2Service]
})
export class VideosComponent implements OnInit {
  @Input() videoItem!: VideoItem;
  videoLink: string | undefined;
  videoFooter: string | undefined;
  //@Output() event1 = new EventEmitter();

  notOn = true;
//  @Output() onVideoEvent=  new EventEmitter();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private resources2Service: Resources2Service
  ) { }

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

  //redirect(){
   // this.resources2Service.videoGo();
  //}


}
