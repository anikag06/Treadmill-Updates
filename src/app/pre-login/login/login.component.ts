import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, 
  state, 
  style, 
  animate, 
  transition 
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { A2HSService } from '@/shared/a2hs.service';

@Component({
  selector: 'app-login',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({
        opacity: 1
      })),
      state('inVisible', style({
        opacity: 0
      })),
      transition('visible => inVisible', [
        animate('1s ease-in')
      ]),
      transition('inVisible => visible', [
        animate('1s ease-out')
      ]),
    ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./mat-login-dialog/mat-login-dialog.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private username!: string;
  private password!: string;
  isVisible = true;

  private loginSubscription!: Subscription;

  constructor(
    private a2hsService: A2HSService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  onJoinTheStudyClicked() {
    this.a2hsService.getDeferredPrompt().subscribe((deferredPrompt) => {
      deferredPrompt.prompt();
    });
  }
}
