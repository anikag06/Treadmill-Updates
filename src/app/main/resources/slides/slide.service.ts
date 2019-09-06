import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { find, flatMap } from 'rxjs/operators';

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
}
