import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { find, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SlidesFeedback, SlidesFeedbackText } from './slide.feedback.model';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  API_ENDPOINT = 'http://172.26.90.50:9000';
  SLIDES_FEEDBACK = '/api/v1/learn/feedback/';
  STORE_FEEDBACK = '/api/v1/learn/slides-feedback/';

  constructor(
    private http: HttpClient
  ) { }

  getSlide(stepId: number) {
    return this.http.get(this.API_ENDPOINT + '/api/v1/flow/steps/' + stepId + '/');
  }

  getFeedBackInfo(slideId: number): Observable<any> {
    return this.http.get(this.API_ENDPOINT + this.SLIDES_FEEDBACK + slideId + '/');
  }

  storeFeedBackInfo(feedback: SlidesFeedback): Observable<any> {
    return this.http.post(this.API_ENDPOINT + this.STORE_FEEDBACK, feedback);
  }

  updateFeedBackInfo(feedback: SlidesFeedbackText, dataId: number) {
    return this.http.put(this.API_ENDPOINT + this.STORE_FEEDBACK + dataId + '/', feedback);
  }

}
