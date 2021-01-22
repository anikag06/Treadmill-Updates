import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrialAuthService {
  canNavigateNextPage = false;

  constructor() {}

  activateChild(nextPage: boolean) {
    this.canNavigateNextPage = nextPage;
  }

  getCanNavigate() {
    return this.canNavigateNextPage;
  }
}
