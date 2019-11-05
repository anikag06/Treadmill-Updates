import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { INTRODUCTION_DATA } from '@/app.constants';


@Injectable({
  providedIn: 'root'
})
export class IntroductionService {

  constructor(
    private http: HttpClient,
  ) { }

  getIntroductionData(introductionId: number): Observable<any> {
    return this.http.get(environment.API_ENDPOINT+INTRODUCTION_DATA+introductionId+"/");
  }

  storeIntroductionData(introductionId: number, data: any) {
    return this.http.put(environment.API_ENDPOINT+INTRODUCTION_DATA+introductionId+"/", {data: data});
  }
}
