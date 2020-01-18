import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Worry } from './worry.model';
import { WPF_WORRY_URL, USELESS_CHARAC_URL } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WorryProductivelyService {
  private worries: Worry[] = [];
  worryBehaviour = new BehaviorSubject({});
  worrysBehaviour = new BehaviorSubject(this.worries);
  moreWorries = true;
  page = 1;
  public postdata = 0;
  constructor(
    private http: HttpClient
  ) { }
  // getWorries() {
  //   const params = new HttpParams().set('page', this.page.toString());
  //   return this.http
  //     .get<Worry[]>(environment.API_ENDPOINT + WPF_WORRY_URL + this.postdata, {
  //       params: params,
  //     })
  //     .subscribe(
  //       (data: any) => {
  //         const worries = <Worry[]>data.results;
  //         if (this.page === 1) {
  //           this.worries = [];
  //         }
  //         this.worries.push(...worries);
  //         this.worrysBehaviour.next(this.worries);
  //         if (data.next) {
  //           this.moreWorries = true;
  //           this.page += 1;
  //           this.getWorries();
  //         } else {
  //           this.moreWorries = false;
  //         }
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error(error);
  //       },
  //     );
  // }
  postWorry(worry: string) {
    return this.http
      .post(environment.API_ENDPOINT + WPF_WORRY_URL, { worry: worry })
      .pipe(
        map((data: any) => {
          this.postdata = data.id;
          this.worries.push(<Worry>data);
          console.log(this.postdata);
          this.worryBehaviour.next(<Worry>data);
          console.log(this.worryBehaviour);
          return data;
        }),
      );
  }
  putWorry(worry: Worry) {
    return this.http
      .put(environment.API_ENDPOINT + WPF_WORRY_URL + worry.id + '/', {
        id: worry.id,
        worry: worry.worry,
        worry_rating_initial: worry.worry_rating_initial
      })
      .pipe(
        map((data: any) => {
          this.worries = this.worries.map(wprod => {
            if (worry.id === wprod.id) {
              return data;
            } else {
              return wprod;
            }
          });
          this.worrysBehaviour.next(this.worries);
          this.worryBehaviour.next(<Worry>data);
          return data;
        }),
      );
  }

  getUselessCharacteristics() {
    return this.http.get(environment.API_ENDPOINT + USELESS_CHARAC_URL);
  }
  postUselessCharacteristics() {

  }
}
