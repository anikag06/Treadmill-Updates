import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VideoItem } from '@/main/resources2/shared/video.model';
import { environment } from '../../../environments/environment';
import { READING_LIST, VIDEO, VIDEO_LIST } from '@/app.constants';
import { switchMap } from 'rxjs/operators';
import {
  AsyncSubject,
  BehaviorSubject,
  forkJoin,
  Observable,
  Subject,
} from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VideosComponent } from '@/main/resources2/videos/videos.component';
import { ReadingItem } from '@/main/resources2/shared/reading.model';

@Injectable({
  providedIn: 'root',
})
export class Resources2Service {
  videoClicked = false;
  videoInResource!: VideoItem;
  readingItemInResource!: ReadingItem;
  //= new VideoItem(1, 'hi', 'hi');
  notOn = true;
  // @Output() event1 = new EventEmitter(); : BehaviorSubject<VideoItem>
  videoClickBehavior: BehaviorSubject<VideoItem> = new BehaviorSubject<
    VideoItem
  >(this.videoInResource);
  videoClickedEvent = this.videoClickBehavior.asObservable();

  readingItemClickBehavior: BehaviorSubject<ReadingItem> = new BehaviorSubject<
    ReadingItem
  >(this.readingItemInResource);
  readingItemClickedEvent = this.readingItemClickBehavior.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  getVideoItem() {
    return this.http.get<VideoItem[]>(environment.API_ENDPOINT + VIDEO_LIST);
  }

  getReadingItem() {
    return this.http.get<ReadingItem[]>(
      environment.API_ENDPOINT + READING_LIST,
    );
  }

  getAVideo(videoId: number) {
    return this.http.get<VideoItem>(
      environment.API_ENDPOINT + VIDEO_LIST + videoId + '/',
    );
  }

  getAReadingItem(readingItemId: number) {
    return this.http.get<ReadingItem>(
      environment.API_ENDPOINT + READING_LIST + readingItemId + '/',
    );
  }

  // getParticularVideo(videoId: Params){
  //   return this.http.get<VideoItem>(environment.API_ENDPOINT  + VIDEO_LIST + videoId + '/')
  // }

  // getEvent1(): Observable<VideoItem> {
  //   return this.videoClickBehavior.asObservable();
  // }
  // callBehavior(x: VideoItem) {
  //   this.videoClickBehavior.next(x);
  // }
}
