import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrialAuthService {
  canNavigateNextPage = false;

  constructor() {}

  activateChild(nextPage: boolean) {
    this.canNavigateNextPage = nextPage;
    console.log('activate func', this.canNavigateNextPage);
  }

  getCanNavigate() {
    console.log(this.canNavigateNextPage);
    return this.canNavigateNextPage;
  }
}
