import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrialRegistrationRoutingModule } from './trial-registration-routing.module';
import { RegistrationStepOneComponent } from './registration-step-one/registration-step-one.component';
import { TrialPagesFooterComponent } from './shared/trial-pages-footer/trial-pages-footer.component';
import { TrialPagesHeaderComponent } from './shared/trial-pages-header/trial-pages-header.component';
import { RegistrationStepTwoComponent } from './registration-step-two/registration-step-two.component';
import { RegistrationStepThreeComponent } from './registration-step-three/registration-step-three.component';
import { QuestionnaireModule } from '@/questionnaire.module';
import { RegistrationStepFourComponent } from './registration-step-four/registration-step-four.component';
import { FaqPageComponent } from './information-pages/faq-page/faq-page.component';
import { PrivacyPolicyComponent } from './information-pages/privacy-policy/privacy-policy.component';
import { AboutUsPageComponent } from './information-pages/about-us-page/about-us-page.component';
import { TermsAndConditionsComponent } from './information-pages/terms-and-conditions/terms-and-conditions.component';
import { MatExpansionModule } from '@angular/material';
import { IneligibleTrialPageComponent } from './information-pages/ineligible-trial-page/ineligible-trial-page.component';
import { RegistrationDataService } from './shared/registration-data.service';
import { StepLastPageComponent } from './information-pages/step-last-page/step-last-page.component';
import { ReregistrationComponent } from './reregistration/reregistration.component';
import { WaitlistComponent } from './waitlist/waitlist.component';
import { WaitlistService } from './waitlist/waitlist.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from '@/main/auth-header.interceptor';
import { TrialsAuthHeaderInterceptor } from '@/trial-registration/shared/trials-auth-header-interceptor';
import { RegistrationStepOneNextComponent } from './registration-step-one-next/registration-step-one-next.component';
import { AiimsRegistrationComponent } from './aiims-registration/aiims-registration.component';

@NgModule({
  declarations: [
    RegistrationStepOneComponent,
    TrialPagesFooterComponent,
    TrialPagesHeaderComponent,
    RegistrationStepTwoComponent,
    RegistrationStepThreeComponent,
    RegistrationStepFourComponent,
    FaqPageComponent,
    PrivacyPolicyComponent,
    AboutUsPageComponent,
    TermsAndConditionsComponent,
    IneligibleTrialPageComponent,
    StepLastPageComponent,
    ReregistrationComponent,
    WaitlistComponent,
    RegistrationStepOneNextComponent,
    AiimsRegistrationComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MatExpansionModule,
    MatRadioModule,
    TrialRegistrationRoutingModule,
    QuestionnaireModule,
  ],
  providers: [
    RegistrationDataService,
    WaitlistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TrialsAuthHeaderInterceptor,
      multi: true,
    },
  ],
})
export class TrialRegistrationModule {}
