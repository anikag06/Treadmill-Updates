import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
    IBG_SENTENCE,
    IBG_SCOREINFO,
    IBG_USER_RESPONSE
} from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class InterpretationBiasGameService {

  NEXT_PAGE = '?page=';

  constructor(private http: HttpClient) { }

  getSentencesInfo(SENTENCE_URL: string, firstTime: boolean, pageUrl: number): Observable<any>  {
    if (firstTime) {
      if (pageUrl === 0) {
        return this.http.get( SENTENCE_URL);
      } else {
         pageUrl = pageUrl + 1;
         return this.http.get(environment.API_ENDPOINT + IBG_SENTENCE + this.NEXT_PAGE + pageUrl);
      }
    } else {
        return this.http.get( SENTENCE_URL );
    }
  }

  getScoresInfo(): Observable<any>  {
    return this.http.get(environment.API_ENDPOINT + IBG_SCOREINFO);
  }

  storeUserScoreInfo(saveData: any): Observable<any> {
    return this.http.put(environment.API_ENDPOINT + IBG_SCOREINFO, saveData);
  }

  storeUserResponseInfo(saveResponseData: any): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + IBG_USER_RESPONSE, saveResponseData);
  }
}
