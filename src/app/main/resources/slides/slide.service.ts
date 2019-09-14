import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { find, flatMap } from 'rxjs/operators';
import { SLIDES_FEEDBACK, STORE_SLIDE_FEEDBACK, SLIDE_COMPLETE_DATA} from '@/app.constants';
import { Observable } from 'rxjs';
import { SlidesFeedback, SlidesFeedbackText } from './slide.feedback.model';
import { SlidesCompleteData } from './slide-complete.model';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  
  constructor(
    private http: HttpClient
  ) { }

  getSlide(stepId: number) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/flow/steps/' + stepId + '/');
  }

  getFeedBackInfo(slideId: number): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + SLIDES_FEEDBACK + slideId + '/');
  }

  storeFeedBackInfo(feedback: SlidesFeedback): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + STORE_SLIDE_FEEDBACK, feedback);
  }

  updateFeedBackInfo(feedback: SlidesFeedbackText, dataId: number) {
    return this.http.put(environment.API_ENDPOINT + STORE_SLIDE_FEEDBACK + dataId + '/', feedback);
  }

  storeCompletionData(completionData: SlidesCompleteData) {
    return this.http.post(environment.API_ENDPOINT + SLIDE_COMPLETE_DATA, completionData);
  }
}
