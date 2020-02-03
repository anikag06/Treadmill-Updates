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
import { LOGGED_IN_PATH } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TrialRegistrationAuthGuard
  implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('user logged in', this.auth.isLoggedIn(), LOGGED_IN_PATH);
    if (this.auth.isLoggedIn()) {
      this.router.navigate([LOGGED_IN_PATH]);
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
    console.log('child user logged in', this.auth.isLoggedIn(), LOGGED_IN_PATH);
    if (this.auth.isLoggedIn()) {
      this.router.navigate([LOGGED_IN_PATH]);
      return false;
    }
    return true;
  }
}
