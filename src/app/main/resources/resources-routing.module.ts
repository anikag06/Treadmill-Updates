import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { FormsListComponent } from '@/main/resources/forms/forms-list/forms-list.component';
import { TaskFormsComponent } from '@/main/resources/forms/task-forms/task-forms.component';
import { ThoughtRecordFormComponent } from '@/main/resources/forms/thought-record-form/thought-record-form.component';
import { ExperimentToTestBeliefFormComponent } from '@/main/resources/forms/experiment-to-test-belief-form/experiment-to-test-belief-form.component';
import { WorryProductivelyComponent } from '@/main/resources/forms/worry-productively-form/worry-productively.component';
import { SlidesComponent } from './slides/slides.component';
import { ConversationsComponent } from './conversation-group/conversations/conversations.component';
import { ConversationGroupComponent } from './conversation-group/conversation-group.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { Introduction1Component } from './introduction/introduction1/introduction1.component';
import { Introduction2Component } from './introduction/introduction2/introduction2.component';
import { Introduction3Component } from './introduction/introduction3/introduction3.component';
import { Introduction4Component } from './introduction/introduction4/introduction4.component';
import { Introduction5Component } from './introduction/introduction5/introduction5.component';
import { ConclusionComponent } from './conclusion/conclusion.component';
import { Conclusion1Component } from './conclusion/conclusion1/conclusion1.component';
import { Conclusion2Component } from './conclusion/conclusion2/conclusion2.component';
import { Conclusion3Component } from './conclusion/conclusion3/conclusion3.component';
import { Conclusion4Component } from './conclusion/conclusion4/conclusion4.component';
import { Conclusion5Component } from './conclusion/conclusion5/conclusion5.component';
import { BeliefChangeComponent } from '@/main/resources/forms/belief-change/belief-change.component';
import { ControlContentComponent } from '@/main/resources/control-content/control-content.component';
import {Introduction6Component} from '@/main/resources/introduction/introduction6/introduction6.component';

export const resourcesRoutes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      {
        path: 'forms',
        component: FormsListComponent,
        data: { title: 'Forms' },
      },
      {
        path: 'forms/problem-solving',
        component: ProblemSolvingWorksheetsComponent,
      },
      {
        path: 'forms/problem-solving/:id',
        component: ProblemSolvingWorksheetsComponent,
      },
      {
        path: 'forms/problem-solving/step/:step_id',
        component: ProblemSolvingWorksheetsComponent,
      },
      {
        path: 'forms/task',
        component: TaskFormsComponent,
      },
      {
        path: 'forms/task/:id',
        component: TaskFormsComponent,
      },
      {
        path: 'forms/task/step/:step_id',
        component: TaskFormsComponent,
      },
      {
        path: 'forms/thought-record',
        component: ThoughtRecordFormComponent,
      },
      {
        path: 'forms/thought-record/:id',
        component: ThoughtRecordFormComponent,
      },
      {
        path: 'forms/thought-record/step/:step_id',
        component: ThoughtRecordFormComponent,
      },
      {
        path: 'forms/test-belief',
        component: ExperimentToTestBeliefFormComponent,
      },
      {
        path: 'forms/test-belief/:id',
        component: ExperimentToTestBeliefFormComponent,
      },
      {
        path: 'forms/test-belief/step/:step_id',
        component: ExperimentToTestBeliefFormComponent,
      },
      {
        path: 'forms/worry-productively',
        component: WorryProductivelyComponent,
      },
      {
        path: 'forms/worry-productively/:id',
        component: WorryProductivelyComponent,
      },
      {
        path: 'forms/worry-productively/step/:step_id',
        component: WorryProductivelyComponent,
      },
      {
        path: 'forms/belief-change',
        component: BeliefChangeComponent,
      },
      {
        path: 'forms/belief-change/:id',
        component: BeliefChangeComponent,
      },
      {
        path: 'forms/belief-change/step/:step_id',
        component: BeliefChangeComponent,
      },
    ],
  },
  { path: 'conversations', component: ConversationsComponent },
  { path: 'conversations-group/:id', component: ConversationGroupComponent },
  { path: 'slides/:id', component: SlidesComponent }, // :id here is step_id
  {
    path: 'introduction',
    component: IntroductionComponent,
    children: [
      { path: '1', component: Introduction1Component },
      { path: '2', component: Introduction2Component },
      { path: '3', component: Introduction3Component },
      { path: '4', component: Introduction4Component },
      { path: '5', component: Introduction5Component },
      { path: '6', component: Introduction6Component },

    ],
  },
  {
    path: 'conclusion',
    component: ConclusionComponent,
    children: [
      { path: '1', component: Conclusion1Component },
      { path: '2', component: Conclusion2Component },
      { path: '3', component: Conclusion3Component },
      { path: '4', component: Conclusion4Component },
      { path: '5', component: Conclusion5Component },
    ],
  },
  { path: 'control-content/:id', component: ControlContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(resourcesRoutes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
