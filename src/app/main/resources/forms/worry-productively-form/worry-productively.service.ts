import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Worry } from './worry.model';
import { WPF_WORRY_URL, 
         USELESS_CHARAC_URL, 
         WORRY_USELESS_CHARAC, 
         THINKING_ERROR_URL, 
         EVALUATE_THINKING_ERROR,
         EVALUATE_EVIDENCES, 
         EVALUATE_PROBABILITY,
         MODIFY_BELIEFS,
         DEAL_WITH_WORRY,
         WORRY_PROBLEM_SOLVING,
         WORRY_FINAL_SLIDER,
} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class WorryProductivelyService {
  private worries: Worry[] = [];
  worryBehaviour = new BehaviorSubject({});
  worrysBehaviour = new BehaviorSubject(this.worries);
  moreWorries = true;
  page = 1;
  worryId !: number  ;
  constructor(private http: HttpClient) {}
  getWorries() {
    // const params = new HttpParams().set('page', this.page.toString());
    return this.http
      .get<Worry[]>(environment.API_ENDPOINT + WPF_WORRY_URL,
        // , {params: params,}
      )
      .subscribe(
        (data: any) => {
          const worries = <Worry[]>data.results;
          // if (this.page === 1) {
          //   this.worries = [];
          // }
          this.worries.push(...worries);
          this.worrysBehaviour.next(this.worries);
          if (data.next) {
            this.moreWorries = true;
            this.page += 1;
            this.getWorries();
          } else {
            this.moreWorries = false;
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        },
      );
  }
  postWorry(worry: string) {
    return this.http
      .post(environment.API_ENDPOINT + WPF_WORRY_URL, { worry: worry })
      .pipe(
        map((data: any) => {
          this.worryId = data.id;
          this.worries.push(<Worry>data);
          console.log(this.worryId);
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
        worry_rating_initial: worry.worry_rating_initial,
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
  deleteWorry(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(
      environment.API_ENDPOINT + WPF_WORRY_URL + id + '/',
      {
        observe: 'response',
      },
    );
  }
  addSituation(worry: Worry) {
    this.worries.push(worry);
    this.worryBehaviour.next(worry);
    this.worrysBehaviour.next(this.worries);
  }

  updateSituation(data: any) {
    const worry = this.worries.find((t: Worry) => t.id === data.id);
    if (worry) {
      this.worries[this.worries.indexOf(worry)] = data;
      this.worrysBehaviour.next(this.worries);
    }
  }
  removeSituation(worryForm: Worry) {
    const worryFormIndex = this.worries.indexOf(worryForm);
    this.worries.splice(worryFormIndex, 1);
    this.worrysBehaviour.next(this.worries);
  }
  getUselessCharacteristics() {
    return this.http.get(environment.API_ENDPOINT + USELESS_CHARAC_URL);
  }
  postUselessCharacteristics(data: any, id: number ) {
    return this.http.post(environment.API_ENDPOINT + WORRY_USELESS_CHARAC + id + '/',
       data,{
        observe : 'response',
       }, 
    );
  }
  getCharacteristics(id : number){
    return this.http.get( environment.API_ENDPOINT + WORRY_USELESS_CHARAC + id + '/',{
        observe : 'response',
      },
    );
  }
  thinkingErrors(){
    return this.http.get(environment.API_ENDPOINT + THINKING_ERROR_URL);
  }
  postThinkingErrors(data : any, id : number){
    return this.http.post(environment.API_ENDPOINT + EVALUATE_THINKING_ERROR + id + '/', 
      data,{
        observe : 'response',
      },
    );
  }
  getThinkingErrors(id : number){
    return this.http.get(environment.API_ENDPOINT + EVALUATE_THINKING_ERROR + id + '/', 
      {
        observe : 'response',
      }, 
    );
  }
  getEvidences(id: number){
    return this.http.get(environment.API_ENDPOINT + EVALUATE_EVIDENCES + 'get/' + id + '/',
      {
        observe : 'response',
      }, 
    );
  }
  deleteEvidence(id: number){
    return this.http.delete<any>(environment.API_ENDPOINT + EVALUATE_EVIDENCES + 'delete/' + id + '/',
      {
        observe : 'response',
      }, 
    );
  }
  putEvidences(data : any, id : number){
    return this.http.put(environment.API_ENDPOINT + EVALUATE_EVIDENCES + id + '/', data ,
      {
        observe : 'response',
      }, 
    );
  }
  postEvidences(data : any, id : number){
    return this.http.post(environment.API_ENDPOINT + EVALUATE_EVIDENCES + id + '/', data ,
      {
        observe : 'response',
      }, 
    );
  }
  putProbabilityRating(data : any, id : number){
    return this.http.put(environment.API_ENDPOINT + EVALUATE_PROBABILITY + id + '/', data ,
      {
        observe : 'response',
      }, 
    );
  }
  postModifyBeliefs(data : any){
    return this.http.post(environment.API_ENDPOINT + MODIFY_BELIEFS , data ,
      {
        observe : 'response',
      }, 
    );
  }
  putModifyBeliefs(data : any, id : number){
    return this.http.put(environment.API_ENDPOINT + MODIFY_BELIEFS + id +'/', data ,
      {
        observe : 'response',
      }, 
    );
  }
  getModifyBeliefs(id : number){
    return this.http.get(environment.API_ENDPOINT + MODIFY_BELIEFS + id + '/',
      {
        observe : 'response',
      }, 
    );
  }
   
  postProblemSolving( data : any){
    return this.http.post(environment.API_ENDPOINT + WORRY_PROBLEM_SOLVING , data ,
      {
        observe : 'response',
      }, 
    );
  }
  getProblemSolving(id : number){
    return this.http.get(environment.API_ENDPOINT + WORRY_PROBLEM_SOLVING + id + '/',
      {
        observe : 'response',
      }, 
    );
  }
  putProblemSolving(data : any, id : number){
    return this.http.put(environment.API_ENDPOINT + WORRY_PROBLEM_SOLVING + id +'/', data ,
      {
        observe : 'response',
      }, 
    );
  }
  postDealWithWorry(data : any){
    return this.http.post(environment.API_ENDPOINT + DEAL_WITH_WORRY , data ,
      {
        observe : 'response',
      }, 
    );
  }
  getDealWithWorry(id : number){
    return this.http.get(environment.API_ENDPOINT + DEAL_WITH_WORRY + id + '/' ,
      {
        observe : 'response',
      }, 
    );
  }
  putDealWithWorry( data : any, id : number){
    return this.http.put(environment.API_ENDPOINT + DEAL_WITH_WORRY + id + '/', data ,
      {
        observe : 'response',
      }, 
    );
  }
  postFinalSlider(data : any){
    return this.http.post(environment.API_ENDPOINT + WORRY_FINAL_SLIDER , data ,
      {
        observe : 'response',
      }, 
    );
  }
  putFinalSlider( data : any, id : number){
    return this.http.put(environment.API_ENDPOINT + WORRY_FINAL_SLIDER + id + '/', data ,
      {
        observe : 'response',
      }, 
    );
  }
  getFinalSlider(id : number){
    return this.http.get(environment.API_ENDPOINT + WORRY_FINAL_SLIDER + id + '/' ,
      {
        observe : 'response',
      }, 
    );
  }
  
}
 