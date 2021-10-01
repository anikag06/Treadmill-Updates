import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { VideoItem } from '@/main/extra-resources/shared/video.model';
import { Observable } from 'rxjs';
import { ReadingItem } from '@/main/extra-resources/shared/reading.model';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { MindfulnessVideoItem } from '@/main/extra-resources/shared/mindfulnessVideo.model';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { VideoCovid19Item } from '@/main/extra-resources/shared/videoCovid19.model';
import { UsefulListItem } from '@/main/extra-resources/shared/usefulList.model';
import {LEVEL1, RESOURCES_PAGE, TESTIMONIALS_PAGE, TREADWILL} from '@/app.constants';
import { Title } from '@angular/platform-browser';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';
import {QuestionnaireService} from "@/shared/questionnaire/questionnaire.service";
import {MatTooltip} from "@angular/material/tooltip";
import {NavbarGoToService} from "@/main/shared/navbar/navbar-go-to.service";

@Component({
  selector: 'app-extra-resources',
  templateUrl: './extra-resources.component.html',
  styleUrls: ['./extra-resources.component.scss'],
})
export class ExtraResourcesComponent implements OnInit {
  user!: User;
  videoItems: VideoItem[] = [];
  readingItems: ReadingItem[] = [];
  usefulListItems: UsefulListItem[] = [];
  mindfulnessVideoItems: MindfulnessVideoItem[] = [];
  videoCovid19Items: VideoCovid19Item[] = [];
  questionnaireItems: QuestionnaireItem[] = [];
  todoquestionnaireItems: QuestionnaireItem[] = [];
  tooltipData!: string;
  questionnaireResults: any[] = [];
  questionnaireRefList: any[] = [];
  videoClicked!: VideoItem;
  showVideoState = false;
  showMyResults = false;
  showMindfulnessVideoState = false;
  showVideoCovid19State = false;
  showReadingMaterialState = false;
  showUsefulListState = false;
  countReadingItem = 0;
  countUsefulListItem = 0;
  countVideoItem = 0;
  countMindfulVideoItem = 0;
  countVideoCovid19Item = 0;
  countQuestionnaireItem = 0;
  todocountQuestionnaireItem = 0;

  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  step_id!: number;
  forVideosTab = true;
  forReadingTab = false;
  forQuestionnaireTab = false;
  quesExpand = false;
  todoquesExpand = false;
  resultDict = <any>[];
  questionnaireRef!: any;

  @ViewChild('mindfulness', { static: false }) mindfulness!: ElementRef;
  @ViewChild('depression', { static: false }) depression!: ElementRef;
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;


  constructor(
    private extraResourcesService: ExtraResourcesService,
    private router: Router,
    private route: ActivatedRoute,
    private loadFilesService: LoadFilesService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private authService: AuthService,
    private quesService: QuestionnaireService,
    private goToService: NavbarGoToService,

) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.activatedRoute.params.subscribe((v) => {
      this.step_id = v.id;
    });
    if (this.step_id) {
      this.stepDataService.getStepData(this.step_id).subscribe((res: any) => {
        const step = res.data;
        // for navbar title
        this.stepGroupSequence = step.step_group_sequence + 1;
        this.stepSequence = step.sequence + 1;
        this.stepName = 'Resources'; // page title will remain same irrespective of actual step name
        this.navbarTitle =
          this.stepGroupSequence.toString() +
          '.' +
          this.stepSequence.toString() +
          ' ' +
          this.stepName;
        this.flowService.stepDetail.emit(this.navbarTitle);
        if (step.data_type) {
          if (step.data_type === TESTIMONIALS_PAGE) {
            this.scrollDown(this.depression);
          } else if (step.data_type === RESOURCES_PAGE) {
            this.scrollDown(this.mindfulness);
          }
        }
      });
    } else {
      this.navbarTitle = 'Resources';
      this.flowService.stepDetail.emit(this.navbarTitle);
    }

    this.extraResourcesService
      .getVideoOnDepressionItem()
      .subscribe((video_data: any) => {
        video_data.results.forEach((element: any) => {
          this.videoItems.push(<VideoItem>element);
          this.countVideoItem = this.countVideoItem + 1;
        });
      });

    this.extraResourcesService
      .getVideoCovid19Item()
      .subscribe((video_data: any) => {
        video_data.results.forEach((element: any) => {
          this.videoCovid19Items.push(<VideoCovid19Item>element);
          this.countVideoCovid19Item = this.countVideoCovid19Item + 1;
        });
      });

    this.extraResourcesService
      .getMindfulnessVideoItem()
      .subscribe((video_data: any) => {
        video_data.results.forEach((element: any) => {
          this.mindfulnessVideoItems.push(<MindfulnessVideoItem>element);
          this.countMindfulVideoItem = this.countMindfulVideoItem + 1;
        });
      });

    this.extraResourcesService
      .getReadingItem()
      .subscribe((reading_data: any) => {
        reading_data.results.forEach((element: any) => {
          this.readingItems.push(<ReadingItem>element);
          this.countReadingItem = this.countReadingItem + 1;
        });
      });

    this.extraResourcesService
      .getUsefulListItem()
      .subscribe((reading_data: any) => {
        reading_data.results.forEach((element: any) => {
          this.usefulListItems.push(<UsefulListItem>element);
          this.countUsefulListItem = this.countUsefulListItem + 1;
        });
      });

       this.quesService
         .getQuestionnaires()
         .subscribe((questionnaire_data: any) => {
           console.log('whole data', questionnaire_data);
           questionnaire_data.results.forEach((element:any) => {
             this.questionnaireItems.push(<QuestionnaireItem>element);
             this.countQuestionnaireItem = this.countQuestionnaireItem + 1;
           });
         });

    this.extraResourcesService.todoBehaviour.subscribe(data => {
      if (data) {
        this.todoquestionnaireItems.length = 0;
        this.getTodoQuestionnaire();
      }
    });
    this.getTodoQuestionnaire();
       this.quesService
         .getResultHistory(this.user.username)
         .subscribe((data: any) => {
           this.questionnaireResults.push(Object.values(data.response.results));
           console.log('results', this.questionnaireResults[0]);
           this.questionnaireRefList.push(Object.values(data.response.reference_table));
           console.log('reflist', this.questionnaireRefList);
           this.questionnaireRef = this.questionnaireRefList[0];
         });
  }

  getTodoQuestionnaire() {
    this.quesService
      .getTodoQuestionnaires()
      .subscribe((questionnaire_data: any) => {
        console.log('TODO data', questionnaire_data);
        questionnaire_data.results.forEach((element:any) => {
          if (element.todo) {
            this.todoquestionnaireItems.push(<QuestionnaireItem>element.questionnaire);
            this.todocountQuestionnaireItem = this.todocountQuestionnaireItem + 1;
          }
        });
        console.log('list of todo questionnaires', this.todocountQuestionnaireItem);
      });
  }


videoClick(videoBeingClicked: VideoItem) {
    this.router.navigate(['videoItem/', videoBeingClicked.id], {
      relativeTo: this.route,
    });
    this.videoClicked = videoBeingClicked;
    this.extraResourcesService.videoClickBehavior.next(videoBeingClicked);
  }

  mindfulnessVideoClick(mindfulnessVideoBeingClicked: MindfulnessVideoItem) {
    this.router.navigate(
      ['mindfulnessVideo/', mindfulnessVideoBeingClicked.id],
      {
        relativeTo: this.route,
      }
    );
    this.extraResourcesService.mindfulnessVideoClickBehavior.next(
      mindfulnessVideoBeingClicked
    );
  }

  videoCovid19Click(videoCovid19BeingClicked: VideoCovid19Item) {
    this.router.navigate(['videoCovid19/', videoCovid19BeingClicked.id], {
      relativeTo: this.route,
    });
    this.extraResourcesService.videoCovid19ClickBehavior.next(
      videoCovid19BeingClicked
    );
  }

  readingItemClick(readingItemBeingClicked: ReadingItem) {
    this.router.navigate(['readingItem/', readingItemBeingClicked.id], {
      relativeTo: this.route,
    });
    this.extraResourcesService.readingItemClickBehavior.next(
      readingItemBeingClicked
    );
  }

  usefulListItemClick(usefulListItemBeingClicked: UsefulListItem) {
    this.router.navigate(['usefulList/', usefulListItemBeingClicked.id], {
      relativeTo: this.route,
    });
    this.extraResourcesService.usefulListItemClickBehavior.next(
      usefulListItemBeingClicked
    );
  }

  questionnaireItemClick(questionnaireItemBeingClicked: QuestionnaireItem) {
    if (questionnaireItemBeingClicked.title === LEVEL1) {
      // attempt questionnaire if todo-list is empty
      if (this.todocountQuestionnaireItem === 0) {
        this.navigatetoquestionnaire(questionnaireItemBeingClicked);
      } else {
        this.tooltipShow();
      }
    } else {
      this.navigatetoquestionnaire(questionnaireItemBeingClicked);
    }
  }

  navigatetoquestionnaire(questionnaireItemBeingClicked: QuestionnaireItem) {
    this.router.navigate(['questionnaireItem/', questionnaireItemBeingClicked.id], {
      relativeTo: this.route,
      state: {questionnaireData: questionnaireItemBeingClicked},
    });

    this.extraResourcesService.questionnaireItemClickBehavior.next(
      questionnaireItemBeingClicked,
    );
    console.log('data click', questionnaireItemBeingClicked);
    this.extraResourcesService.sendQuestionnaireItem.emit(questionnaireItemBeingClicked);

  }



  changeMindfulnessVideoState() {
    this.showMindfulnessVideoState = !this.showMindfulnessVideoState;
  }

  changeVideoState() {
    this.showVideoState = !this.showVideoState;
  }

  changeVideoOnCovid19State() {
    this.showVideoCovid19State = !this.showVideoCovid19State;
  }

  changeReadingMaterialState() {
    this.showReadingMaterialState = !this.showReadingMaterialState;
  }

  changeUsefulListState() {
    this.showUsefulListState = !this.showUsefulListState;
  }
  changeQuesState() {
    this.goToService.settingsPageTitle.emit('Questionnaire');
    this.quesExpand = true;
  }
  changeTodoQuesState() {
    this.todoquesExpand = true;
  }

  scrollDown(elem: any) {
    setTimeout(() => {
      elem.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
  onVideosTab() {
    this.forVideosTab = true;
    this.forReadingTab = false;
    this.forQuestionnaireTab = false;
  }
  onReadingTab() {
    this.forVideosTab = false;
    this.forReadingTab = true;
    this.forQuestionnaireTab = false;
  }
  onQuestionnaireTab() {
    this.forVideosTab = false;
    this.forReadingTab = false;
    this.forQuestionnaireTab = true;
  }

  onMyListClick() {
    this.showMyResults = false;
  }

  onMyResultsClick() {
    this.showMyResults = true;
  }

  tooltipShow() {
    if (this.showToolTip.disabled) {
      this.showToolTip.disabled = false;
    }
    this.tooltipData = 'Please complete the Todo questionnaires recommended above to attempt this questionnaire again.';
    this.showToolTip.showDelay = 100;
    this.showToolTip.hideDelay = 100;
    this.showToolTip.toggle();
  }
}
