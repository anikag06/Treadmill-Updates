import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MIUser } from './mi-user.model';
import { MICurrentStateService } from './mi-current-state.service';
import { Level } from './level.model';
import { MiPlayComponent } from './mi-play/mi-play.component';
import { MIPlayService } from './mi-play.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';

@Component({
  selector: 'app-mental-imagery',
  templateUrl: './mental-imagery.component.html',
  styleUrls: ['./mental-imagery.component.scss'],
})
export class MentalImageryComponent implements OnInit {
  @ViewChild(MiPlayComponent, { static: false })
  miPlayComponent!: MiPlayComponent;
  @Output() showPlayButtons = new EventEmitter();

  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  user = new MIUser('sourav', 0, [], null);
  levelList: Level[] = [];
  isDisabled = false;
  home = true;
  instructions = false;
  playing = false;
  showInstructionIcon = true;
  showLoading = true;
  imagesPreloaded = false;


  constructor(
    private getCurrentStateService: MICurrentStateService,
    private miPlayService: MIPlayService,
    private loadFilesService: LoadFilesService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private loadFileService: LoadFilesService,

  ) {}

  ngOnInit() {
    this.loadFileService
      .loadExternalScript(
        'assets/games//mental-imagery-game/mental-imagery-assets.js',
      )
      .then(() => {
        this.imagesPreloaded = true;
        console.log('IMAGES LOADED');
      })
      .catch(() => {});
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(id)),
      )
      .subscribe((res: any) => {
        const step = res.data;
        console.log('RESPONSE', res.data, step.status);
        // for navbar title
        this.stepGroupSequence = step.step_group_sequence + 1;
        this.stepSequence = step.sequence + 1;
        this.stepName = step.name;
        this.navbarTitle =
          this.stepGroupSequence.toString() +
          '.' +
          this.stepSequence.toString() +
          ' ' +
          this.stepName;
        console.log('STEP DETAIL:', this.navbarTitle);
        this.flowService.stepDetail.emit(this.navbarTitle);
      });
    this.miPlayService.startPlaying.subscribe(() => {
      this.startPlayingMIGame();
    });
  }

  goToMIGameInstruction() {
    this.home = false;
    this.playing = false;
    this.instructions = true;
  }

  startPlayingMIGame() {
    this.instructions = false;
    this.home = false;
    this.playing = true;
  }
  goToMIGameHome() {
    this.home = true;
    this.playing = false;
    this.instructions = false;
    this.showInstructionIcon = false;
  }

  onScoreUpdate(score: number) {
    this.user.points.push(score);
  }
  replayMIGame() {
    this.miPlayComponent.onNavBarReplay();
  }
  pauseMIGame() {
    this.miPlayComponent.onPause();
  }
  resumeMIGame() {
    this.miPlayComponent.onResumePlay();
  }
  removeLoading() {
    setTimeout(() => {
      this.showLoading = false;
      this.showPlayButtons.emit();
    }, 100);
  }
}
