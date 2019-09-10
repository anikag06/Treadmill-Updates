import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { find, flatMap } from 'rxjs/operators';
import {SLIDES_FEEDBACK} from '@/app.constants';
import { Observable } from 'rxjs';
import { SlidesFeedback } from './slide.feedback.model';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  API_ENDPOINT = 'http://172.26.90.50:9000';
  constructor(
    private http: HttpClient
  ) { }

  getSlide(stepId: number) {
    return this.http.get(this.API_ENDPOINT + '/api/v1/flow/steps/' + stepId + '/');
  }

  getFeedBackInfo(slideId: number): Observable<any> {
    return this.http.get(this.API_ENDPOINT + SLIDES_FEEDBACK + slideId + '/');
  }

  storeFeedBackInfo(feedback: SlidesFeedback) {
    return this.http.post(this.API_ENDPOINT + SLIDES_FEEDBACK, feedback);
  }

  updateFeedBackInfo(feedback: SlidesFeedback) {
    return this.http.put(this.API_ENDPOINT + SLIDES_FEEDBACK, feedback);
  }

}
