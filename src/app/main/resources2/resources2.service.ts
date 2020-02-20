import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { VideoItem } from '@/main/resources2/shared/video.model';
import { environment } from '../../../environments/environment';
import { VIDEO_LIST } from '@/app.constants';
import { switchMap } from 'rxjs/operators';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {VideosComponent} from '@/main/resources2/videos/videos.component';

@Injectable({
  providedIn: 'root',
})
export class Resources2Service {
  videoClicked = false;
  videoInResource!: VideoItem ;
  notOn = true;
 // @Output() event1 = new EventEmitter(); : BehaviorSubject<VideoItem>
  event1: BehaviorSubject<VideoItem> = new BehaviorSubject<VideoItem>(this.videoInResource);
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
   // private video: VideoItem
    // private videos: VideosComponent
  ) {}
  getVideoItem() {
    return this.http.get<VideoItem[]>(environment.API_ENDPOINT + VIDEO_LIST);
  }
  // getAgain(id: string): Observable<VideoItem[]> {
  //   const id$ = this.getVideoItem(id);
  //   result = id$.pipe(switchMap(id => forkJoin(id.map(ids => this.getVideoItem(ids)))));
  //   return result;
  // }
  // getVideo(){
  //   return this.video;
  // }
  getEvent1(): Observable<VideoItem> {
    return this.event1.asObservable();
  }

  callBehavior(x:VideoItem){
    this.event1.next(x);
  }


  // videoGo() {
  //   // this.notOn = false;
  //   console.log('video loading is');
  //  // this.videoClicked = true;
  //   this.router.navigate(['videoItem'], {relativeTo: this.route})
  // }


  //   getVideoDetail(x: VideoItem){
  //     //x: VideoItem
  //     this.videos.giveVideoDetail(x);
  //     console.log('working for resources');
  //   }
}
