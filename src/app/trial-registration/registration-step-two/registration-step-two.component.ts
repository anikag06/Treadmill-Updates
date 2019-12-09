import { Component, OnInit } from '@angular/core';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router } from '@angular/router';
import { INELIGIBLE_FOR_TRIAL } from '@/app.constants';

@Component({
  selector: 'app-registration-step-two',
  templateUrl: './registration-step-two.component.html',
  styleUrls: ['./registration-step-two.component.scss']
})
export class RegistrationStepTwoComponent implements OnInit {

  stepNo = 2;
  userEligible = false;

  constructor(
    private authService: TrialAuthService,
    private router: Router,

  ) { }

  ngOnInit() {
  }
  genderSelected() {

  }

  stepDataSubmit() {

    // get data from database

    if (this.userEligible) {
      this.authService.activateChild(true);
      this.router.navigate(['trial/trial-registration/step-3'] );
    } else {
      this.authService.activateChild(true);
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
    }
  }
}
