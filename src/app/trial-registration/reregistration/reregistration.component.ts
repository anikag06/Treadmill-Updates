import { Component, OnInit } from '@angular/core';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';
import { RegistrationDataService } from '@/trial-registration/shared/registration-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrialAuthService } from '@/trial-registration/shared/trial-auth.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';

@Component({
  selector: 'app-reregistration',
  templateUrl: './reregistration.component.html',
  styleUrls: ['./reregistration.component.scss'],
})
export class ReregistrationComponent implements OnInit {
  constructor(
    private registrationDataService: RegistrationDataService,
    private activatedRoute: ActivatedRoute,
    private authService: TrialAuthService,
    private showContactUsService: MatContactUsDialogService,
    private questionnaireService: QuizService,
    private router: Router,
  ) {}

  encrypted_email!: string;
  userEligible = false;
  reregister = true;
  showContent!: boolean;

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showContent = true;
    }
    this.activatedRoute.params.subscribe(params => {
      this.encrypted_email = params.unique_code;
      this.registrationDataService
        .storeEncryptedEmailID(this.encrypted_email)
        .subscribe(
          (res_data: any) => {
            this.registrationDataService.participationID =
              res_data.data.participant_id;
            this.userEligible = !res_data.data.excluded;
            if (this.userEligible) {
              this.authService.activateChild(true);
              const stepNumber = res_data.data.next_step;
              const navigation_step = REGISTRATION_PATH + '/step-' + stepNumber;

              if (stepNumber === 3) {
                this.questionnaireService.questionnaire_name =
                  res_data.data.next_questionnaire;
                this.router.navigate([navigation_step]);
              } else {
                this.router.navigate([navigation_step]);
              }
            } else {
              // this.authService.activateChild(true);
              this.router.navigate([INELIGIBLE_FOR_TRIAL]);
            }
          },
          err => {
            this.router.navigate([REGISTRATION_PATH]);
          },
        );
    });
  }
}
