import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireContainerComponent } from '@/shared/questionnaire-container/questionnaire-container.component';
import { QuestionnaireItemComponent } from '@/shared/questionnaire/questionnaire-item/questionnaire-item.component';
import { QuestionnaireComponent } from '@/shared/questionnaire/questionnaire.component';
import { ErrorDialogComponent } from '@/shared/error-dialog/error-dialog.component';
import { InternetConnectionComponent } from '@/shared/internet-connection/internet-connection.component';
import { CommonDialogComponent } from '@/shared/common-dialog/common-dialog.component';
import { MatContactUsDialogComponent } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.component';
import { NotFoundComponent } from '@/shared/not-found/not-found.component';

export const questionnaireContainerRoutes: Routes = [
  {
    path: '',
    component: QuestionnaireContainerComponent,
    children: [
      //   {path: 'questionnaireItem/:id', component: QuestionnaireItemComponent},
      // ]
      {
        path: 'questionnaireItem/:id',
        component: QuestionnaireItemComponent,
      },
      {
        path: '',
        component: QuestionnaireContainerComponent,
        pathMatch: 'prefix',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(questionnaireContainerRoutes)],
  exports: [RouterModule],
})
export class QuestionnaireContainerRoutingModule {}
