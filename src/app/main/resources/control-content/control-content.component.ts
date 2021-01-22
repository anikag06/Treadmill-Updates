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
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { ControlContentService } from '@/main/resources/control-content/control-content.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { PassDataService } from '@/main/resources/conversation-group/passdata.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { PHQ9, TREADWILL } from '@/app.constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-control-content',
  templateUrl: './control-content.component.html',
  styleUrls: ['./control-content.component.scss'],
})
export class ControlContentComponent implements OnInit {
  @ViewChild('target', { static: false }) target!: ElementRef;
  @ViewChild('target2', { static: false }) target2!: ElementRef;

  // x = '<div class="row"><div class="col"><h2 >hi</h2></div></div>' ;
  displayHtml: string | undefined;
  displayHtmlHeader: string | undefined;
  next_step_id!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  current_step_id!: number;
  isLastStep = false;
  dataloaded = false;
  showLoading = false;
  lastStepCompleted = false;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  moodEvaluate = false;
  stepGroupSequence!: number;
  showQuestionnaire = false;
  completedStatus!: string;
  nextDataLoaded = false;
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
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.nextDataLoaded = false;
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
      }
    });
  }
  nextBtnShow = false;

  ngOnInit() {
    //Remove this code if controlcontent is loading correctly
    // this.goToService.nextControlContentLoad.subscribe(() => {
    //   this.nextDataLoaded = false;
    //   if (this.router.url === this.urlData) {
    //     console.log('data is same');
    //     this.nextDataLoaded = true;
    //   }
    //   console.log('NEXT DATA LOADED' , this.nextDataLoaded);
    // });
    // this.showNextContentLoading = false;
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
        this.displayHtml = control_data.data.step_data.data.html_content;
        this.displayHtmlHeader = control_data.data.step_data.data.title;
        this.next_step_id = control_data.data.next_step_id;
        this.current_step_id = control_data.data.id;
        this.isLastStep = control_data.data.is_last_step;
        this.completedStatus = control_data.data.status;
        // this.showNextContentLoading = false;
        this.onScrollToTop();

        this.dataloaded = true;
        this.nextDataLoaded = true;
        this.onScrollToTop();
        this.lastStepCompleted = false;
        if (control_data.data.status === 'COMPLETED') {
          this.nextBtnShow = true;

          if (this.isLastStep) {
            this.lastStepCompleted = true;
          }
        } else if (control_data.data.status === 'ACTIVE') {
          this.nextBtnShow = false;
        }
        if (control_data.data.next_questionnaire) {
          this.quizService.questionnaire_name =
            control_data.data.next_questionnaire;
          this.moodEvaluate = true;
        } else {
          this.moodEvaluate = false;
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
        this.flowService.stepDetail.emit(this.navbarTitle);
        this.flowService.navbarTitle = this.navbarTitle;
      });
    this.quizService.questionnaire_active.subscribe((value: boolean) => {
      if (!value) {
        this.showQuestionnaire = false;
        this.moodEvaluate = false;
        this.navbarTitle = this.flowService.navbarTitle;
        this.flowService.stepDetail.emit(this.navbarTitle);
        this.scrollDown();
      } else {
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
    // this.nextBtnShow = true;
    //  console.log('after clicking on  complete', this.completedStatus);
    this.showLoading = true;
    this.completionData.step_id = this.current_step_id;
    this.completionData.time_spent = 100;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe((data: any) => {
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
    this.goToService.clickFlow.emit();
    // console.log('after clicking on next', this.completedStatus);
    // this.showNextContentLoading = true;
  }

  onScrollToTop() {
    setTimeout(() => {
      this.target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
  scrollDown() {
    setTimeout(() => {
      this.target2.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}
