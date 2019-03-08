import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN } from '@/app.constants';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as localforage from 'localforage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  getUserDetails(data: any) {
    return this.http.post('http://localhost:8000/api/v1/user/login/', data)
  }

  isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem(TOKEN)
    if (jwtToken) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(jwtToken);
      if (!isExpired) {
        return true;
      }
    }
    return false;
  }


  isLoggedInAsync() {
    return localforage.getItem(TOKEN)
      .then((data) => {
        if (data) {
          const helper = new JwtHelperService();
          const isExpired = helper.isTokenExpired(<string>data);
          if (!isExpired) {
            return true;
          }
        }
        return false;
      }).catch(() => {
        return false;
      });
  }

  logout() {
    return localforage.clear()
      .finally(() => {
        this.router.navigate(['/']);
      });
  }
}
