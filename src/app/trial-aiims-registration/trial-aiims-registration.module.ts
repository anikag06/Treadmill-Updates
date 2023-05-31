import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from '@/main/auth-header.interceptor';
import { MatExpansionModule } from '@angular/material';

import { TrialsAuthHeaderInterceptor } from '@/trial-registration/shared/trials-auth-header-interceptor';
import { AiimsRegistrationStepTwoComponent } from '../trial-aiims-registration/aiims-registration-step-two/aiims-registration-step-two.component';
import { AiimsRegistrationStepThreeComponent } from '../trial-aiims-registration/aiims-registration-step-three/aiims-registration-step-three.component';
import { AiimsRegistrationStepFourComponent } from '../trial-aiims-registration/aiims-registration-step-four/aiims-registration-step-four.component';
import {QuestionnaireModule} from '@/questionnaire.module';
import {RegistrationDataService} from '@/trial-registration/shared/registration-data.service';
import {TrialAiimsRegistrationRoutingModule} from '@/trial-aiims-registration/trial-aiims-registration-routing.module';
import {AiimsStepLastPageComponent} from '@/trial-aiims-registration/aiims-step-last-page/aiims-step-last-page.component';
import { TrialOpenInfoComponent } from './trial-open-info/trial-open-info.component';
import {TrialRegistrationModule} from '@/trial-registration/trial-registration.module';
import {QuestionnaireDeprecatedModule} from '@/questionnaire-deprecated.module';
import { TrialOpenLoginHeaderComponent } from './trial-open-login-header/trial-open-login-header.component';
import {AppModule} from '@/app.module';

@NgModule({
  declarations: [
    AiimsRegistrationStepTwoComponent,
    AiimsRegistrationStepThreeComponent,
    AiimsRegistrationStepFourComponent,
    AiimsStepLastPageComponent,
    TrialOpenInfoComponent,
    // TrialOpenLoginHeaderComponent,
  ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        MatExpansionModule,
        MatRadioModule,
        TrialAiimsRegistrationRoutingModule,
        QuestionnaireModule,
        TrialRegistrationModule,
        QuestionnaireDeprecatedModule,
        // AppModule
    ],
  providers: [
    // RegistrationDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TrialsAuthHeaderInterceptor,
      multi: true,
    },
  ],
})
export class TrialAiimsRegistrationModule {}
