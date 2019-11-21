import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/material.module';
import {MatRadioModule} from '@angular/material/radio';

import { TrialRegistrationRoutingModule } from './trial-registration-routing.module';
import { RegistrationStepOneComponent } from './registration-step-one/registration-step-one.component';
import { TrialPagesFooterComponent } from './shared/trial-pages-footer/trial-pages-footer.component';
import { TrialPagesHeaderComponent } from './shared/trial-pages-header/trial-pages-header.component';
import { RegistrationStepTwoComponent } from './registration-step-two/registration-step-two.component';
import { RegistrationStepThreeComponent } from './registration-step-three/registration-step-three.component';
// import { QuestionnaireModule } from '@/questionnaire.module';


@NgModule({
  declarations: [
    RegistrationStepOneComponent, 
    TrialPagesFooterComponent, 
    TrialPagesHeaderComponent, 
    RegistrationStepTwoComponent, 
    RegistrationStepThreeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatRadioModule,
    TrialRegistrationRoutingModule,
    // QuestionnaireModule,
  ],
  providers: [
  ]
})
export class TrialRegistrationModule { }
