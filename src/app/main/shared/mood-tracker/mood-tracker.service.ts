import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FEELING_LIST_API} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class MoodTrackerService {
  constructor(private http: HttpClient) {}

  getFeelingsList() {
    return this.http
      .get(environment.API_ENDPOINT + FEELING_LIST_API)
      .toPromise();
  }
}
