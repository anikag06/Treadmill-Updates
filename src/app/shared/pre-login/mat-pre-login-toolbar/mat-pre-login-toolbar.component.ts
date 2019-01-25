import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '@/login/login.component';

@Component({
  selector: 'app-mat-pre-login-toolbar',
  templateUrl: './mat-pre-login-toolbar.component.html',
  styleUrls: ['./mat-pre-login-toolbar.component.scss']
})
export class MatPreLoginToolbarComponent implements OnInit {

  constructor(private loginComponent: LoginComponent) { }

  ngOnInit() {
  }

  onLoginClicked() {
    this.loginComponent.showLogin();
  }

}
