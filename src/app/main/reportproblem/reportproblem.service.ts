import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {POST_COMPLAINT, REPORT_BUG} from "@/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportproblemService {

  constructor(private http: HttpClient) { }

 reportProblem (data: any) {
    return this.http.post(environment.API_ENDPOINT + REPORT_BUG, {
      'bug' : data
    });
  }
}
