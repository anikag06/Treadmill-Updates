import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DEFAULT_PATH, INELIGIBLE_FOR_TRIAL } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  // check if users are eligible for the study or not,
  // get this value from db
  eligible = true;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('can activate', this.auth.isLoggedIn(), this.eligible);
    if (!this.auth.isLoggedIn()) {
      this.router.navigate([DEFAULT_PATH]);
      return false;
    } else if (!this.eligible) {
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
      return false;
    }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('can activate child', this.auth.isLoggedIn(), this.eligible);
    if (!this.auth.isLoggedIn()) {
      this.router.navigate([DEFAULT_PATH]);
      return false;
    } else if (!this.eligible) {
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
      return false;
    }
    return true;
  }
}
