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
  openLinksPage = false; //openLinksPage  refer to all new links // they are availaible on screens sizes desktop and mobile


  constructor(
    private authService: TrialAuthService,
    private router: Router,
    private registrationDataService: RegistrationDataService,
    private aiimsRegistrationDataService: TrialAiimsRegistrationService,

  ) {}


  ngOnInit() {
    if (this.router.url.includes('aiims532')) {
      this.openLinksPage = false;
    } else {
      this.openLinksPage = true;
      console.log(this.openLinksPage, 'new open links');
    }
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice || this.openLinksPage) {
      this.showPage = true;
    }
    this.aiimsRegistrationDataService.aiimsUser = true;
    this.registrationDataService.participationID = this.aiimsRegistrationDataService.participationID;
    }
}
