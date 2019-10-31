import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { FormsListComponent } from '@/main/resources/forms/forms-list/forms-list.component';
import { TaskFormsComponent } from '@/main/resources/forms/task-forms/task-forms.component';
import { SlidesComponent } from './slides/slides.component';
import { ConversationsComponent } from './conversation-group/conversations/conversations.component';
import { ConversationGroupComponent } from './conversation-group/conversation-group.component';
import { ConclusionPageComponent } from './conclusion-page/conclusion-page.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { Introduction1Component } from './introduction/introduction1/introduction1.component';
import { Introduction2Component } from './introduction/introduction2/introduction2.component';

export const formRoutes: Routes = [
  { path: '', component: FormsComponent, children: [
      { path: 'forms', component: FormsListComponent },
      { path: 'forms/problem-solving', component: ProblemSolvingWorksheetsComponent },
      { path: 'forms/tasks', component: TaskFormsComponent },
    ]
  },
  { path: 'conversations', component: ConversationsComponent },
  { path: 'conversations-group/:id', component: ConversationGroupComponent },
  { path: 'slides/:id', component: SlidesComponent },
  { path: 'introduction', component: IntroductionComponent, children:[
      { path: '0', component: Introduction1Component },
      { path: '1', component: Introduction2Component },
    ] 
  },
  { path: 'conclusion/:id', component: ConclusionPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(formRoutes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
