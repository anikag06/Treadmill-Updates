import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SLIDES_FEEDBACK,
  SLIDE_COMPLETE_DATA,
  STORE_FEEDBACK,
  VIDEO_OPTED,
  VIDEO_DONT_ASK_AGAIN,
  SHOW_VIDEO,
} from '@/app.constants';
import { Observable } from 'rxjs';
import { SlidesFeedback, SlidesFeedbackText } from './slide.feedback.model';
import { StepCompleteData } from '../shared/completion-data.model';
import { environment } from 'environments/environment';
import { SlidesVideoOpted, SlidesVideoShowStatus } from './slides-video.model';

@Injectable({
  providedIn: 'root',
})
export class SlideService {
  highlightBtn = new EventEmitter();
  videoUrl_1!: string;
  videoUrl_3!: string;
  videoUrl_5!: string;

  constructor(private http: HttpClient) {}

  getFeedBackInfo(slideId: number): Observable<any> {
    console.log(slideId);
    return this.http.get(
      environment.API_ENDPOINT + SLIDES_FEEDBACK + slideId + '/',
    );
  }

  storeFeedBackInfo(feedback: SlidesFeedback): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + STORE_FEEDBACK, feedback);
  }

  updateFeedBackInfo(feedback: SlidesFeedbackText, dataId: number) {
    return this.http.put(
      environment.API_ENDPOINT + STORE_FEEDBACK + dataId + '/',
      feedback,
    );
  }

  storeVideoOption(opted: SlidesVideoOpted) {
    return this.http.post(environment.API_ENDPOINT + VIDEO_OPTED, opted);
  }

  storeVideoShowStatus(status: SlidesVideoShowStatus) {
    return this.http.post(
      environment.API_ENDPOINT + VIDEO_DONT_ASK_AGAIN,
      status,
    );
  }

  getVideo() {
    return this.http.get(environment.API_ENDPOINT + SHOW_VIDEO);
  }
}
