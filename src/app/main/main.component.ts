import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { Router } from '@angular/router';
import { LOGGED_IN_PATH } from '@/app.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: User = new User(0, 'undefined', 'test@test.com', '');

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    isExpanded = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit() {
    const user = this.authService.isLoggedIn();
    console.log(user)
    if (user) {
      this.user = <User>user;
    } else {
      this.router.navigate([LOGGED_IN_PATH]);
    }

  }

}