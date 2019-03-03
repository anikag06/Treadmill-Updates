import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.module';
import { TOKEN } from '@/app.constants';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}


  getUserDetails(data: any) {
    return this.http.post('http://localhost:8000/api/v1/user/login/', data)
  }

  isLoggedIn(): boolean {
    let jwtToken = localStorage.getItem(TOKEN)
    if (jwtToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(jwtToken);
      const isExpired = helper.isTokenExpired(jwtToken);
      if (!isExpired) {
        return true;
      }
    }
    return false;
  }
}
