import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TrialAuthService} from '@/trial-registration/shared/trial-auth.service';
import {Router} from '@angular/router';
import {RegistrationDataService} from '@/trial-registration/shared/registration-data.service';
import {TrialAiimsRegistrationService} from '@/trial-aiims-registration/trial-aiims-registration.service';

@Component({
  selector: 'app-trial-aiims-registration-step-three',
  templateUrl: './aiims-registration-step-three.component.html',
  styleUrls: ['./aiims-registration-step-three.component.scss']
})
export class AiimsRegistrationStepThreeComponent implements OnInit {

  stepNo = 3;
  showPage = false;
  userEligible = false;
  allowSubmit = false;
  showLoading = false;
  userDeclined = false;
  aiimsUser = false;

  participationID = 0;
  country_data!: any;
  timezone_data!: any;
  otherOptionSelected = false;
  showErrorMsg = false;
  placeholder_tz!: any;

  constructor(
    private authService: TrialAuthService,
    private router: Router,
    private registrationDataService: RegistrationDataService,
    private aiimsRegistrationDataService: TrialAiimsRegistrationService,

  ) {}


  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    this.aiimsRegistrationDataService.aiimsUser = true;
    this.registrationDataService.participationID = this.aiimsRegistrationDataService.participationID;
    if (smallDevice) {
      this.showPage = true;
    }
    }
}
