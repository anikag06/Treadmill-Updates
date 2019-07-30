import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TOKEN,
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
    const loginToken = localStorage.getItem(TOKEN);
    if (loginToken != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + loginToken
        })
      };
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
    } else {
      return this.http.get(SENTENCE_URL);
    }
  }

  getScoresInfo(): Observable<any>  {
    const loginToken = localStorage.getItem(TOKEN);
    if (loginToken != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + loginToken
        })
      };
      return this.http.get(environment.API_ENDPOINT + IBG_SCOREINFO);
    } else {
      return this.http.get(environment.API_ENDPOINT + IBG_SCOREINFO);
    }
  }

  storeUserScoreInfo(saveData: any): Observable<any> {
    const loginToken = localStorage.getItem(TOKEN);
    if (loginToken != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + loginToken
        })
      };
      return this.http.put(environment.API_ENDPOINT + IBG_SCOREINFO, saveData);
    } else {
      return this.http.put(environment.API_ENDPOINT + IBG_SCOREINFO, saveData);
    }
  }
  storeUserResponseInfo(saveResponseData: any): Observable<any> {
    const loginToken = localStorage.getItem(TOKEN);
    if (loginToken != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + loginToken
        })
      };
      return this.http.post(environment.API_ENDPOINT + IBG_USER_RESPONSE, saveResponseData);
    } else {
      return this.http.post(environment.API_ENDPOINT + IBG_USER_RESPONSE, saveResponseData);
    }
  }
}
