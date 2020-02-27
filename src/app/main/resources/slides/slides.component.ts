import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { SlideService } from './slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormDirective } from './form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { TaskFormsComponent } from '../forms/task-forms/task-forms.component';
import { Slide } from './Slide.model';
import { SlidesFeedback, SlidesFeedbackText } from './slide.feedback.model';
import { StepCompleteData } from '../shared/completion-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import {
  SLIDE,
  FORM_PROBLEM_SOLVING_WORKSHEET,
  FORM_TASK,
  COMPLETED,
  ACTIVE,
} from '@/app.constants';
import { CommonDialogsService } from '../shared/common-dialogs.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { StepsDataService } from '../shared/steps-data.service';
import { UserFeedbackComponent } from '../shared/user-feedback/user-feedback.component';
import { MatBottomSheet } from '@angular/material';
import { SlidesBottomsheetComponent } from './slides-bottomsheet/slides-bottomsheet.component';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ display: 'none' })),
      state('show', style({ display: 'block' })),
      transition('hidden => show', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('formInOut', [
      state('hidden', style({ display: 'none' })),
      state('show', style({ display: 'block' })),
      transition('hidden => show', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SlidesComponent implements OnInit {
  @ViewChild(FormDirective, { static: false }) formHost!: FormDirective;
  @ViewChild('form_div', { static: false }) formDiv!: ElementRef;
  @ViewChild('slideDiv', { static: false }) slideDiv!: ElementRef;
  @ViewChild('slidePage', { static: false }) slidePage!: ElementRef;
  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild(UserFeedbackComponent, { static: false })
  userFeedback!: UserFeedbackComponent;
  scrollTop = 0;

  constructor(
    private slideService: SlideService,
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private commonDialogService: CommonDialogsService,
    private flowStepService: FlowStepNavigationService,
    private stepDataService: StepsDataService,
    private _bottomSheet: MatBottomSheet,
  ) { }

  slide!: Slide;
  sanitizedUrl!: SafeUrl;
  status!: string;
  notAvailable = false;

  visible!: boolean;
  isFormVisible = false;
  isSlidesVisible = true;

  showNextStepBtn = false;
  slideLiked = false;
  slideDisliked = false;

  initial_feedback!: number;
  feedbackDataId!: number;

  feedbackData: SlidesFeedback = new SlidesFeedback(0, 0, 1);
  feedbackText: SlidesFeedbackText = new SlidesFeedbackText('');
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  time_spent: any;
  current_step_id!: number;
  isLastStep = false;
  lastStepCompleted = false;
  next_step_id!: number;
  step_type: any;
  screenHeight: any;
  screenWidth: any;

  ngOnInit() {
    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(parseInt(id, 10))),
      )
      .subscribe((slide_data: any) => {
        if (
          [COMPLETED, ACTIVE].includes(slide_data.data.status) &&
          slide_data.data.data_type === SLIDE
        ) {
          this.step_type = SLIDE;
          this.slide = <Slide>slide_data.data.step_data.data;
          this.current_step_id = slide_data.data.id;
          this.isLastStep = slide_data.data.is_last_step;
          this.next_step_id = slide_data.data.next_step_id;
          if (slide_data.data.status === COMPLETED) {
            this.showNextStepBtn = true;
            if (this.isLastStep) {
              this.lastStepCompleted = true;
            }
          }
          const slideId = slide_data.data.step_data.data.id;
          this.slideService
            .getFeedBackInfo(slideId)
            .subscribe((feedback_data: any) => {
              if (feedback_data.exists) {
                this.initial_feedback = feedback_data.feedback;
                if (this.initial_feedback === 1) {
                  this.slideLiked = true;
                } else if (this.initial_feedback === -1) {
                  this.slideDisliked = true;
                }
              } else {
                this.slideDisliked = false;
                this.slideLiked = false;
                this.initial_feedback = 0; // if it the first response
              }
            });
          if (this.slide) {
            this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.slide.url,
            );
          } else {
            this.notAvailable = true;
          }
          const formName = slide_data.data.action[0];
          if (formName === FORM_PROBLEM_SOLVING_WORKSHEET) {
            setTimeout(
              () => this.loadForm(ProblemSolvingWorksheetsComponent),
              1000,
            );
          } else if (formName === FORM_TASK) {
            setTimeout(() => this.loadForm(TaskFormsComponent), 1000);
          }
          if (window.matchMedia('(max-width: 767px)').matches) {
            this.visible = true;
          } else {
            setTimeout(
              () => {
                this.slideDiv.nativeElement.classList.add('col-5'),
                  console.log('iframe height', window.screen.height, this.slideDiv.nativeElement.offsetHeight);
              },
              1000,
            );
          }
        } else {
          this.notAvailable = true;
        }
      });
  }

  ngAfterContentInit(): void {
    this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;
    setTimeout(() => this.openBottomSheet(), 100);
  }

  loadForm(component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component,
    );
    const viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.isFormVisible = false;
    } else {
      this.isFormVisible = true;
      this.formDiv.nativeElement.classList.add('col-4');
    }
  }
  onShowForm() {
    this.visible = !this.visible;
    this.isFormVisible = true;
    this.isSlidesVisible = false;
  }

  onShowSlides() {
    this.visible = !this.visible;
    this.isSlidesVisible = true;
    this.isFormVisible = false;
  }

  scrollPageToBottom() {
    this.scrollTop = this.slideDiv.nativeElement.scrollHeight;
    setTimeout(() => {
      this.slideDiv.nativeElement.scrollTop = this.scrollTop;
    }, 100);
  }

  storeSlideFeedBackData() {
    this.feedbackData.initial_feedback_state = this.initial_feedback;
    this.feedbackData.final_feedback_state = this.userFeedback.final_feedback;
    this.feedbackData.slide_id = this.slide.id;
    this.slideService.storeFeedBackInfo(this.feedbackData).subscribe(data => {
      this.feedbackDataId = data.data.id;
      this.initial_feedback = this.userFeedback.final_feedback;
    });
  }

  onCompleted() {
    this.time_spent = 100;
    this.completionData.time_spent = this.time_spent;
    this.completionData.step_id = this.current_step_id;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => { });
    this.commonDialogService.openCongratsDialog(
      this.current_step_id,
      this.next_step_id,
      this.isLastStep,
    );
    this.showNextStepBtn = true;
  }
  onNextStepClick() {
    this.flowStepService
      .getNextStepData(this.next_step_id)
      .subscribe(next_step => {
        this.flowStepService.virtualStepMarkDone(
          next_step.data,
          this.time_spent,
        );
        const next_step_url = this.flowStepService.goToFlowNextStep(
          next_step.data,
        );
        this.router.navigate([next_step_url]);
      });
  }
  onSubmitComment() {
    this.feedbackText.feedback_text = this.userFeedback.feedback_text;
    this.slideService
      .updateFeedBackInfo(this.feedbackText, this.feedbackDataId)
      .subscribe(data => { });
    this.scrollTop = 0;
  }
  openBottomSheet() {
    this._bottomSheet.open(SlidesBottomsheetComponent);
  }

}
