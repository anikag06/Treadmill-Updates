import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';
import { TREADWILL } from '@/app.constants';

@Component({
  selector: 'app-logout',
  template: '',
  styles: [''],
})
export class LogoutComponent {
  constructor(private authService: AuthService, private titleService: Title) {
    this.authService.logout(true);
    this.titleService.setTitle(TREADWILL);
  }
}
