import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrialRegistrationRoutingModule } from './trial-registration-routing.module';
import { RegistrationStepOneComponent } from './registration-step-one/registration-step-one.component';


@NgModule({
  declarations: [RegistrationStepOneComponent],
  imports: [
    CommonModule,
    TrialRegistrationRoutingModule
  ]
})
export class TrialRegistrationModule { }
