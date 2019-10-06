import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GET_STEP_DATA, FLOW_STEP_MARK_DONE } from '@/app.constants';
import { StepCompleteData } from './completion-data.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StepsDataService {

  constructor(
    private http: HttpClient
  ) { }

  getStepData(stepId: number) {
    return this.http.get(environment.API_ENDPOINT + GET_STEP_DATA + stepId + '/');
  }

  storeCompletionData(completionData: StepCompleteData) {
    return this.http.post(environment.API_ENDPOINT + FLOW_STEP_MARK_DONE, completionData);
  }

  getBadgeInfo(moduleSequence: number) {
    console.log(moduleSequence);
    return this.http.get(environment.API_ENDPOINT + '/api/v1/badges/MODULE-' + moduleSequence + '/');
  }
}
