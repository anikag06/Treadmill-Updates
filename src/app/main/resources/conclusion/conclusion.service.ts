import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { CONCLUSION_DATA } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ConclusionService {
  moodEvaluate!: boolean;
  constructor(private http: HttpClient) {}

  getConclusionData(stepGroupSequence: number): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + CONCLUSION_DATA + stepGroupSequence + '/',
    );
  }

  storeConclusionData(stepGroupSequence: number, data: any) {
    return this.http.put(
      environment.API_ENDPOINT + CONCLUSION_DATA + stepGroupSequence + '/',
      { data: data },
    );
  }
}
