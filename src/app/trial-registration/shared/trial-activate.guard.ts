import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TrialAuthService } from './trial-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrialActivateGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: TrialAuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.getCanNavigate()) {
      this.router.navigate(['/trial/trial-registration']);
      return false;
    }
    this.authService.activateChild(false);
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
