import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoginComponent } from '@/login/login.component';
import { LoggerService } from '@/shared/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private loginComponent: LoginComponent, 
              private logger: LoggerService) {
    logger.log(window.screen.orientation.type);
    window.screen.orientation.addEventListener('change', () => {
      logger.warn("orientation changed");
    });
  }
  
  onLoginClicked() {
    this.loginComponent.showLogin();
  }
}
