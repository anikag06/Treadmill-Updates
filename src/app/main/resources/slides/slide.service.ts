import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SLIDES_FEEDBACK,
  SLIDE_COMPLETE_DATA,
  STORE_FEEDBACK,
} from '@/app.constants';
import { Observable } from 'rxjs';
import { SlidesFeedback, SlidesFeedbackText } from './slide.feedback.model';
import { StepCompleteData } from '../shared/completion-data.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SlideService {
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
}
