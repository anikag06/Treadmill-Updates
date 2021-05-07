import { Component, OnInit } from '@angular/core';
import {AuthService} from "@/shared/auth/auth.service";
import {RegistrationDataService} from "@/trial-registration/shared/registration-data.service";
import {USEREXCLUDED} from "@/app.constants";

@Component({
  selector: 'app-ineligible-trial-page',
  templateUrl: './ineligible-trial-page.component.html',
  styleUrls: ['./ineligible-trial-page.component.scss'],
})
export class IneligibleTrialPageComponent implements OnInit {

  userExcluded = false;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    if (this.authService.isUserExcluded) {
      this.userExcluded = true;
    } else if (localStorage.getItem((USEREXCLUDED)) === 'true') {
      this.userExcluded = true;
    }
  }
}
