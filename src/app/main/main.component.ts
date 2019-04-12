import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user!: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    isExpanded = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {}


  ngOnInit() {
    this.authService.isLoggedIn()
      .then((data) => {
        if (data) {
          this.user = <User>data;
        }
      });
  }

}