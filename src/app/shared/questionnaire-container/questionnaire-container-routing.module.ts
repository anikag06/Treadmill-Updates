import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireContainerComponent } from '@/shared/questionnaire-container/questionnaire-container.component';
import { QuestionnaireItemComponent } from '@/shared/questionnaire/questionnaire-item/questionnaire-item.component';

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
        data: { registered_user: false },
      },
      {
        path: '',
        component: QuestionnaireContainerComponent,
        pathMatch: 'prefix',
      },
    ],
    data: { registered_user: false },
  },
];

@NgModule({
  imports: [RouterModule.forChild(questionnaireContainerRoutes)],
  exports: [RouterModule],
})
export class QuestionnaireContainerRoutingModule {}
