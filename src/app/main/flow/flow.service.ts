import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(
    private http: HttpClient
  ) { }

  getFlow() {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/flow/flow/');
  }
}
