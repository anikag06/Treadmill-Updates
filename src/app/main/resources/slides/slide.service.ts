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

  getSlides(moduleId: number) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/learn/slides/' + moduleId + '/')
      .pipe(
        flatMap((resp: any) => {
          return resp.results;
        })
      );
  }

  getSlide(moduleId: number, slideId: number) {
    return this.getSlides(moduleId)
      .pipe(
        find((data: any) => {
          return data.id === slideId;
        })
      );
  }
}
