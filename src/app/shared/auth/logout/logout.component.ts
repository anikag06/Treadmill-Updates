import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
  styles: ['']
})
export class LogoutComponent {

  constructor(
    private router: Router
  ) {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
