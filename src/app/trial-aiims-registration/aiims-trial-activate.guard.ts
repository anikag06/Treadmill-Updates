import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TrialAuthService} from '@/trial-registration/shared/trial-auth.service';
import {AIIMS_REGISTRATION_PATH, REGISTRATION_PATH} from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AiimsTrialActivateGuard implements CanActivate, CanActivateChild {
  constructor(private authService: TrialAuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.getCanNavigate()) {
      this.router.navigate([AIIMS_REGISTRATION_PATH]);
      return false;
    }
    this.authService.activateChild(false);
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
    return true;
  }
}
