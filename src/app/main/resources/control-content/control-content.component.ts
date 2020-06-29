import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FlowService } from '@/main/flow/flow.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { ControlContentService } from '@/main/resources/control-content/control-content.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { PassDataService } from '@/main/resources/conversation-group/passdata.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import {QuizService} from '@/shared/questionnaire/questionnaire.service';
import {PHQ9} from '@/app.constants';

@Component({
  selector: 'app-control-content',
  templateUrl: './control-content.component.html',
  styleUrls: ['./control-content.component.scss'],
})
export class ControlContentComponent implements OnInit {
  @ViewChild('target', { static: false }) target!: ElementRef;

  // x = '<div class="row"><div class="col"><h2 >hi</h2></div></div>' ;
  displayHtml: string | undefined;
  displayHtmlHeader: string | undefined;
  next_step_id!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  current_step_id!: number;
  isLastStep = false;
  dataloaded = true;
  showLoading = false;
  lastStepCompleted = false;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  moodEvaluate = false;
  stepGroupSequence!: number;
  showQuestionnaire = false;
  // elem = document.getElementById('hi');

  constructor(
    private flowService: FlowService,
    private activateRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private loadFilesService: LoadFilesService,
    private controlContentService: ControlContentService,
    private flowStepService: FlowStepNavigationService,
    private router: Router,
    private passData: PassDataService,
    private goToService: NavbarGoToService,
    private quizService: QuizService,
  ) {}
  nextBtnShow = false;

  ngOnInit() {
    this.loadFilesService
      .loadExternalStyles('/control-content-styles.css')
      .then(() => {})
      .catch(() => {});

    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(parseInt(id, 10))),
      )
      .subscribe((control_data: any) => {
        console.log('control data: ', control_data);
        this.displayHtml = control_data.data.step_data.data.html_content;
        this.displayHtmlHeader = control_data.data.step_data.data.title;
        this.next_step_id = control_data.data.next_step_id;
        this.current_step_id = control_data.data.id;
        this.isLastStep = control_data.data.is_last_step;

        this.dataloaded = true;
        if (control_data.data.status === 'COMPLETED') {
          this.nextBtnShow = true;
          if (this.isLastStep) {
            this.lastStepCompleted = true;
          }
        } else if (control_data.data.status === 'ACTIVE') {
          this.nextBtnShow = false;
          if (this.isLastStep) {
            this.moodEvaluate = true;
            console.log('check mood');
          }
        }
        // for navbar title
        this.stepGroupSequence = control_data.data.step_group_sequence + 1;
        this.stepSequence = control_data.data.sequence + 1;
        this.stepName = control_data.data.name;
        this.navbarTitle =
          this.stepGroupSequence.toString() +
          '.' +
          this.stepSequence.toString() +
          ' ' +
          this.stepName;
        console.log('STEP DETAIL:', this.navbarTitle);
        this.flowService.stepDetail.emit(this.navbarTitle);
      });
    this.quizService.questionnaire_active.subscribe((value: boolean) => {
      console.log('EVENT EMITTED', value);
      if (!value) {
        // this.quizService.questionnaireActive = false;
        // this.moodEvaluated = true;
        this.showQuestionnaire = false;
        this.moodEvaluate = false;
        this.navbarTitle = this.flowService.navbarTitle;
        this.flowService.stepDetail.emit(this.navbarTitle);
      } else {
        console.log('EVENT EMITTED', 'show questionnaire', value);
        this.quizService.questionnaire_name = PHQ9;
        this.showQuestionnaire = true;
        this.navbarTitle = 'Mood test';
        this.flowService.stepDetail.emit(this.navbarTitle);
      }
    });
  }
  //
  // onHtmlNext() {
  //   this.flowStepService
  //     .getNextStepData(this.next_step_id)
  //     .subscribe(next_step => {
  //       console.log('next_step_detail is', next_step);
  //       console.log('next_step_data is', next_step.data);
  //       const next_step_url = this.flowStepService.goToFlowNextStep(
  //         next_step.data,
  //       );
  //       console.log('url is', next_step_url);
  //       this.router.navigate([next_step_url]);
  //       this.onScrollToTop();
  //       // this.nextButton(next_step);
  //     });
  //   this.dataloaded = false;
  //   // this.nextLoaded = false;
  // }

  onHtmlComplete() {
    this.showLoading = true;
    this.completionData.step_id = this.current_step_id;
    this.completionData.time_spent = 100;
    console.log(
      'step id',
      this.completionData.step_id,
      this.completionData.time_spent,
    );
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(() => {
        this.showLoading = false;
        if (!this.isLastStep) {
          this.nextBtnShow = true;
        } else {
          this.lastStepCompleted = true;
        }
      });

    this.dataloaded = true;
    // this.onHtmlNext();
    // this.nextButton(this.current_step_id);
  }

  onHtmlDashboard() {
    this.router.navigate(['/']);
  }

  onHtmlNextClick() {
    // this.router.navigate([this.onHtmlNext()]);
    this.goToService.clickFlow.emit();
  }

  onScrollToTop() {
    setTimeout(() => {
      this.target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
}
