import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThingsTodoService {
  constructor(private http: HttpClient) {}

  getThingsTodo() {
    return this.http.get(
      environment.API_ENDPOINT + '/api/v1/user/explore/list/',
    );
  }
}
