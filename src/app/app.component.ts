import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private loginComponent: LoginComponent) { }
  
  onLoginClicked() {
    this.loginComponent.showLogin();
  }
}
