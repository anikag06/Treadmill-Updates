import { Component, OnInit } from '@angular/core';
import { RegistrationDataService } from '@/trial-registration/shared/registration-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrialAuthService } from '@/trial-registration/shared/trial-auth.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { INELIGIBLE_FOR_TRIAL, PHQ9, REGISTRATION_PATH } from '@/app.constants';
import { WaitlistService } from './waitlist.service';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent implements OnInit {
  constructor(
    private waitlistService: WaitlistService,
    private activatedRoute: ActivatedRoute,
    private authService: TrialAuthService,
    private showContactUsService: MatContactUsDialogService,
    private quizService: QuizService,
    private router: Router,
    private registrationDataService: RegistrationDataService,
  ) {}

  encrypted_email!: string;
  userEligible = false;
  showQuestionnaire = false;
  username!: string;
  sign_up_link!: string;
  userExists = false;
  already_submitted = false;
  date_over = false;
  showContent = false;
  quizSubmitted = false;
  loading = true;

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showContent = true;
    }
   this.registrationDataService.isWaitList = true;
    this.activatedRoute.params.subscribe(params => {
      this.encrypted_email = params['unique-code'];

      this.waitlistService.getLinkData(this.encrypted_email).subscribe(
        (res_data: any) => {
          this.loading = false;
          this.registrationDataService.participationID =
            res_data.participant_id;
          this.userEligible = !res_data.participant_excluded;
          if (!this.userEligible) {
            this.router.navigate([INELIGIBLE_FOR_TRIAL]);
          } else if (!res_data.show_questionnaire) {
            this.showQuestionnaire = false;
            if (res_data.user_exists) {
              this.username = res_data.username;
              this.userExists = true;
            } else if (res_data.already_submitted) {
              this.already_submitted = true;
              this.sign_up_link = res_data.sign_up_link;
            } else if (res_data.date_over) {
              this.date_over = true;
              this.sign_up_link = res_data.sign_up_link;
            }
          } else if (res_data.show_questionnaire) {
            this.quizService.questionnaire_name = res_data.next_questionnaire;
            this.showQuestionnaire = true;
          }
        },
        err => {
          this.loading = false;
          this.router.navigate(['/']);
        },
      );
    });
    this.quizService.questionnaire_active.subscribe((value: boolean) => {
      if (!value) {
        this.showQuestionnaire = false;
        this.quizSubmitted = true;
      }
    });
  }
}
