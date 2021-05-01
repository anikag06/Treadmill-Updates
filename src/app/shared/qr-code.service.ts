import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private http: HttpClient) {}

  getImageData(link: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://chart.googleapis.com/chart?cht=qr&chl=' + link + '&chs=160x160&chld=L|0', { responseType: 'blob' });
  }

}
