import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DEFAULT_PATH, INELIGIBLE_FOR_TRIAL } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  // check if users are eligible for the study or not,
  // get this value from db
  eligible!: boolean;


  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('can activate', this.auth.isLoggedIn(), this.eligible);

    this.eligible = !this.auth.isUserExcluded;
    if (!this.auth.isLoggedIn() && !this.eligible) {
      console.log('navigate to:', INELIGIBLE_FOR_TRIAL);
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
      return false;
    } else if (!this.auth.isLoggedIn() && this.eligible) {
      console.log('navigate to:', DEFAULT_PATH);
      this.router.navigate([DEFAULT_PATH]);
      return false;
    }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('can activate child', this.auth.isLoggedIn(), this.eligible, next.data);
    this.auth.navbarTitle = next.data.title;
    this.eligible = !this.auth.isUserExcluded;
    if (!this.auth.isLoggedIn() && !this.eligible) {
      console.log('navigate to:', INELIGIBLE_FOR_TRIAL);
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
      return false;
    } else if (!this.auth.isLoggedIn() && this.eligible) {
      console.log('navigate to:', DEFAULT_PATH);
      this.router.navigate([DEFAULT_PATH]);
      return false;
    }
    return true;
  }
}
