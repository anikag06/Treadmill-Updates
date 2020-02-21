import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { VideoItem } from '@/main/resources2/shared/video.model';
import { environment } from '../../../environments/environment';
import { VIDEO_LIST } from '@/app.constants';
import { switchMap } from 'rxjs/operators';
import {AsyncSubject, BehaviorSubject, forkJoin, Observable, Subject} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {VideosComponent} from '@/main/resources2/videos/videos.component';

@Injectable({
  providedIn: 'root',
})
export class Resources2Service {
  videoClicked = false;
  videoInResource!: VideoItem;
    //= new VideoItem(1, 'hi', 'hi');
  notOn = true;
 // @Output() event1 = new EventEmitter(); : BehaviorSubject<VideoItem>
  event1: BehaviorSubject<any> = new BehaviorSubject<any>(this.videoInResource);
  //event1: Subject<any> = new Subject<any>();
  //event1: AsyncSubject<any> = new AsyncSubject<any>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  getVideoItem() {
    return this.http.get<VideoItem[]>(environment.API_ENDPOINT + VIDEO_LIST);
  }

  getEvent1(): Observable<VideoItem> {
    return this.event1.asObservable();
  }

  callBehavior(x:VideoItem){
    this.event1.next(x);
  }



}
