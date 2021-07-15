import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { environment } from '../../../environments/environment';
import {
  MINDFULNESS_VIDEO_LIST,
  READING_LIST,
  VIDEO,
  DEPRESSION_VIDEO_LIST,
  WATCHED_VIDEO,
  VIDEO_COVID_19_LIST,
  USEFUL_LIST, QUESTIONNAIRE_LIST,
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
import { VideoCovid19Item } from '@/main/extra-resources/shared/videoCovid19.model';
import {QuestionnaireItem} from "@/shared/questionnaire/shared/questionnaire.model";

@Injectable({
  providedIn: 'root',
})
export class ExtraResourcesService {
  videoClicked = false;
  videoInResource!: VideoItem;
  mindfulnessVideoInResource!: MindfulnessVideoItem;
  readingItemInResource!: ReadingItem;
  videoCovid19InResource!: VideoCovid19Item;
  usefulListItemInResource!: ReadingItem;
  questionnaireItemInResource!: QuestionnaireItem;
  sendQuestionnaireItem =  new EventEmitter<any>();

  videoClickBehavior: BehaviorSubject<VideoItem> = new BehaviorSubject<
    VideoItem
  >(this.videoInResource);
  videoClickedEvent = this.videoClickBehavior.asObservable();

  videoCovid19ClickBehavior: BehaviorSubject<
    VideoCovid19Item
  > = new BehaviorSubject<VideoCovid19Item>(this.videoCovid19InResource);
  videoCovid19ClickedEvent = this.videoCovid19ClickBehavior.asObservable();

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

  usefulListItemClickBehavior: BehaviorSubject<
    ReadingItem
  > = new BehaviorSubject<ReadingItem>(this.usefulListItemInResource);
  usefulListItemClickedEvent = this.usefulListItemClickBehavior.asObservable();

  questionnaireItemClickBehavior: BehaviorSubject<
    QuestionnaireItem
    > = new BehaviorSubject<QuestionnaireItem>(this.questionnaireItemInResource);
  questionnaireItemClickedEvent = this.questionnaireItemClickBehavior.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  getVideoOnDepressionItem() {
    return this.http.get<VideoItem[]>(
      environment.API_ENDPOINT + DEPRESSION_VIDEO_LIST,
    );
  }

  getVideoCovid19Item() {
    return this.http.get<VideoCovid19Item[]>(
      environment.API_ENDPOINT + VIDEO_COVID_19_LIST,
    );
  }

  getReadingItem() {
    return this.http.get<ReadingItem[]>(
      environment.API_ENDPOINT + READING_LIST,
    );
  }
  getUsefulListItem() {
    return this.http.get<ReadingItem[]>(environment.API_ENDPOINT + USEFUL_LIST);
  }

  getMindfulnessVideoItem() {
    return this.http.get<MindfulnessVideoItem[]>(
      environment.API_ENDPOINT + '/api/v1/resources/mindfulness-videos/',
    );
  }

  getAVideoOnDepression(videoId: number) {
    return this.http.get<VideoItem>(
      environment.API_ENDPOINT + DEPRESSION_VIDEO_LIST + videoId + '/',
    );
  }

  getAVideoCovid19(videoId: number) {
    return this.http.get<VideoCovid19Item>(
      environment.API_ENDPOINT + VIDEO_COVID_19_LIST + videoId + '/',
    );
  }

  getAReadingItem(readingItemId: number) {
    return this.http.get<ReadingItem>(
      environment.API_ENDPOINT + READING_LIST + readingItemId + '/',
    );
  }
  getAUsefulListItem(readingItemId: number) {
    return this.http.get<ReadingItem>(
      environment.API_ENDPOINT + USEFUL_LIST + readingItemId + '/',
    );
  }

  getAMindfulnessVideo(mindfulnessVideoId: number) {
    return this.http.get<MindfulnessVideoItem>(
      environment.API_ENDPOINT +
        '/api/v1/resources/mindfulness-videos/' +
        mindfulnessVideoId +
        '/',
    );
  }
  getQuestionnaire(){
    return this.http.get<QuestionnaireItem>(
      environment.API_ENDPOINT + QUESTIONNAIRE_LIST
    );
  }

  markVideoWatched(videoId: number, watched: boolean) {
    return this.http.post(environment.API_ENDPOINT + WATCHED_VIDEO, {
      resource_video_id: videoId,
      watched: watched,
    });
  }
}
