import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { environment } from '../../../environments/environment';
import {
  MINDFULNESS_VIDEO_LIST,
  READING_LIST,
  VIDEO,
  VIDEO_LIST,
  WATCHED_VIDEO,
} from '@/app.constants';
import { switchMap } from 'rxjs/operators';
import {
  AsyncSubject,
  BehaviorSubject,
  forkJoin,
  Observable,
  Subject,
} from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VideosComponent } from '@/main/extra-resources/videos/videos.component';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { MindfulnessVideoItem } from '@/main/extra-resources/shared/mindfulnessVideo.model';

@Injectable({
  providedIn: 'root',
})
export class ExtraResourcesService {
  videoClicked = false;
  videoInResource!: VideoItem;
  mindfulnessVideoInResource!: MindfulnessVideoItem;
  readingItemInResource!: ReadingItem;

  videoClickBehavior: BehaviorSubject<VideoItem> = new BehaviorSubject<
    VideoItem
  >(this.videoInResource);
  videoClickedEvent = this.videoClickBehavior.asObservable();

  readingItemClickBehavior: BehaviorSubject<ReadingItem> = new BehaviorSubject<
    ReadingItem
  >(this.readingItemInResource);
  readingItemClickedEvent = this.readingItemClickBehavior.asObservable();

  mindfulnessVideoClickBehavior: BehaviorSubject<
    MindfulnessVideoItem
  > = new BehaviorSubject<MindfulnessVideoItem>(
    this.mindfulnessVideoInResource,
  );
  mindfulnessVideoClickedEvent = this.mindfulnessVideoClickBehavior.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  getVideoItem() {
    return this.http.get<VideoItem[]>(environment.API_ENDPOINT + VIDEO_LIST);
    console.log('getting a video');
  }

  getReadingItem() {
    return this.http.get<ReadingItem[]>(
      environment.API_ENDPOINT + READING_LIST,
    );
  }

  getMindfulnessVideoItem() {
    return this.http.get<MindfulnessVideoItem[]>(
      environment.API_ENDPOINT + '/api/v1/resources/mindfulness-videos/',
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

  getAMindfulnessVideo(mindfulnessVideoId: number) {
   // console.log('mindfulness video returned');
    return this.http.get<MindfulnessVideoItem>(
      environment.API_ENDPOINT +
        '/api/v1/resources/mindfulness-videos/' +
        mindfulnessVideoId +
        '/',
    );
  }

  markVideoWatched(videoId: number, watched: boolean) {
    console.log('marking', videoId, watched);
    return this.http.post(environment.API_ENDPOINT + WATCHED_VIDEO, {
      resource_video_id: videoId,
      watched: watched,
    });
    //console.log('marking', videoId, watched);
  }
}
