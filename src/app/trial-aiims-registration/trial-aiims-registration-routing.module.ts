import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { FaqPageComponent } from './information-pages/faq-page/faq-page.component';
// import { TermsAndConditionsComponent } from './information-pages/terms-and-conditions/terms-and-conditions.component';
// import { PrivacyPolicyComponent } from './information-pages/privacy-policy/privacy-policy.component';
// import { AboutUsPageComponent } from './information-pages/about-us-page/about-us-page.component';
// import { TrialRegistrationAuthGuard } from '@/shared/auth/trial-registration-auth.guard';
// import { IneligibleTrialPageComponent } from './information-pages/ineligible-trial-page/ineligible-trial-page.component';
// import { StepLastPageComponent } from './information-pages/step-last-page/step-last-page.component';
import {AiimsRegistrationStepTwoComponent} from '@/trial-aiims-registration/aiims-registration-step-two/aiims-registration-step-two.component';
import {
  AiimsRegistrationStepThreeComponent
} from '@/trial-aiims-registration/aiims-registration-step-three/aiims-registration-step-three.component';
import {AiimsRegistrationStepFourComponent} from '@/trial-aiims-registration/aiims-registration-step-four/aiims-registration-step-four.component';
import {AiimsTrialActivateGuard} from '@/trial-aiims-registration/aiims-trial-activate.guard';
import {AiimsStepLastPageComponent} from '@/trial-aiims-registration/aiims-step-last-page/aiims-step-last-page.component';
import {TrialAiimsRegistrationComponent} from '@/trial-aiims-registration/trial-aiims-registration/trial-aiims-registration.component';
import {TrialOpenInfoComponent} from '@/trial-aiims-registration/trial-open-info/trial-open-info.component';

const routes: Routes = [
  {
    path: 'step-2',
    component: AiimsRegistrationStepTwoComponent,
    canActivate: [AiimsTrialActivateGuard],
  },
  {
    path: 'step-3',
    component: AiimsRegistrationStepThreeComponent,
    canActivate: [AiimsTrialActivateGuard],
  },
  {
    path: 'step-4',
    component: AiimsRegistrationStepFourComponent,
    canActivate: [AiimsTrialActivateGuard],
  },
  {
    path: 'step-5',
    component: AiimsStepLastPageComponent,
    canActivate: [AiimsTrialActivateGuard],
  },

  {
    path: 'info',
    component: TrialOpenInfoComponent,
    // canActivate: [AiimsTrialActivateGuard],
  },
  // {
  //   path: 'terms-and-conditions',
  //   component: TermsAndConditionsComponent,
  //   canActivate: [TrialRegistrationAuthGuard],
  // },
  // {
  //   path: 'privacy-policy',
  //   component: PrivacyPolicyComponent,
  //   canActivate: [TrialRegistrationAuthGuard],
  // },
  // {
  //   path: 'about-us',
  //   component: AboutUsPageComponent,
  //   canActivate: [TrialRegistrationAuthGuard],
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrialAiimsRegistrationRoutingModule {}
