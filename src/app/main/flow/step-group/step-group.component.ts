import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StepGroup } from './step-group.model';
import { Step } from './step/step.model';
import { ACTIVE, COMPLETED, UNLOCKED } from '@/app.constants';
import { MatDrawer } from '@angular/material/sidenav';
import { MatExpansionPanel } from '@angular/material/expansion';
import { IntroService } from '@/main/walk-through/intro.service';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-step-group',
  templateUrl: './step-group.component.html',
  styleUrls: ['./step-group.component.scss'],
  animations: [
    trigger('openClose', [
    state('open',
      style({height: '*', opacity: 1,  transform: 'translateY(0%)'}),
    ),
      state('closed',
        style({height: '0', opacity: 0,  transform: 'translateY(0%)'}),
      ),
      transition('open => closed', [
        animate('1000ms ease-in-out', keyframes([
          style({height: '*', opacity: 1, transform: 'translateY(50%)',  offset: 0}),
          style({height: '100px', opacity: 0.5, transform: 'translateY(100%)', offset: 0.5}),
          style({height: '0px', opacity: 0, offset: 1.0}),
        ])),
      ]),
      transition('closed => open', [
        animate('1000ms ease-in-out', keyframes([
          style({height: '0', opacity: 0, offset: 0}),
          style({height: '100px', opacity: 0.5, offset: 0.5}),
          style({height: '*', opacity: 1, offset: 1.0}),
        ])),
      ]),
    ])
    ]
})

export class StepGroupComponent implements OnInit {
  @Input() stepGroup!: StepGroup;
  @Input() identifier!: string;
  first!: boolean;
  last!: boolean;
  isExpanded = false;
  showLessSteps = true;
  defaultSteps: StepGroup = {
    id: 0,
    sequence: 0,
    name: '',
    status: UNLOCKED,
    steps: [],
  };
  NO_OF_STEPS_SHOWN = 3; // number of steps shown by default
  isShowAllBtn = true;
  firstStepOfModule!: boolean;
  lastStepOfModule = false;
  @ViewChild('panel', { static: true }) panel!: MatExpansionPanel;

  constructor(private elem: ElementRef, private introService: IntroService) {}

  ngOnInit() {
    this.initialiseDefaultSteps();
    this.getDefaultStepsShown();
  }
  ngAfterViewInit() {
    // this is done to update the property of material expansion panel as ng-deep can't be used.
    // tslint:disable-next-line: max-line-length
    const flowPanel = this.elem.nativeElement.querySelectorAll(
      '.flow-expansion-panel .mat-expansion-panel-content .mat-expansion-panel-body',
    );
    flowPanel[0].setAttribute(
      'style',
      ' padding: 0 15px 12px !important;padding-left: 2px !important;',
    );
  }

  panelOpened() {
    this.isExpanded = true;
  }

  initialiseDefaultSteps() {
    this.defaultSteps.id = this.stepGroup.id;
    this.defaultSteps.name = this.stepGroup.name;
    this.defaultSteps.sequence = this.stepGroup.sequence;
    this.defaultSteps.status = this.defaultSteps.status;
  }

  getDefaultStepsShown() {
    const no_steps = this.stepGroup.steps.length;
    this.defaultSteps.steps = [];
    if (no_steps <= this.NO_OF_STEPS_SHOWN) {
      this.NO_OF_STEPS_SHOWN = no_steps;
      this.isShowAllBtn = false;
      this.lastStepOfModule = true;
    }
    if (no_steps === 2 && this.stepGroup.status === ACTIVE) {
      this.isExpanded = true;
      for (let i = 0; i < no_steps; i++) {
        let j = 0;
        if (this.stepGroup.steps[i].status === ACTIVE) {
          if (i === 0) {
            // if first element
            j = i;
            this.firstStepOfModule = true;
          } else if (i === 1) {
            // if last element
            j = i - 1;
            this.firstStepOfModule = false;
          }
          for (let k = 0; k < no_steps; k++) {
            this.defaultSteps.steps.push(this.stepGroup.steps[j]);
            j++;
          }
          if (j === no_steps) {
            this.lastStepOfModule = true;
          }
        }
      }
    } else if (this.stepGroup.status === ACTIVE) {
      this.isExpanded = true;
      let showActiveStep = this.findActiveStep(this.stepGroup);
      if (showActiveStep) {
        this.introService.setPanel(this.panel);
        this.introService.setActiveStepIntro(true);
      }
      for (let i = 0; i < no_steps; i++) {
        let j = 0;
        if (this.stepGroup.steps[i].status === ACTIVE) {
          if (i === 0) {
            // if first element
            j = i;
            this.firstStepOfModule = true;
          } else if (i > 0 && i < no_steps - 1) {
            j = i - 1;
            this.firstStepOfModule = false;
          } else if (i === no_steps - 1) {
            // if last element
            j = i - 2;
            this.firstStepOfModule = false;
          }
          for (let k = 0; k < this.NO_OF_STEPS_SHOWN; k++) {
            this.defaultSteps.steps.push(this.stepGroup.steps[j]);
            j++;
          }
          if (j === no_steps) {
            this.lastStepOfModule = true;
          }
        }
      }
    } else {
      // if module is not active then shown first three steps by default
      for (let i = 0; i < this.NO_OF_STEPS_SHOWN; i++) {
        this.defaultSteps.steps.push(this.stepGroup.steps[i]);
        this.firstStepOfModule = true;
      }
    }
  }

  percentageComplete() {
    const steps = this.stepGroup.steps;
    const completed = steps.filter((step: Step) => step.status === COMPLETED)
      .length;
    return (completed / steps.length) * 100;
  }

  dashOffset() {
    const totalDashOffset = 126;
    const percentDashOffset =
      (totalDashOffset * this.percentageComplete()) / 100 || 0;
    return totalDashOffset - percentDashOffset;
  }

  collapseClick() {
    this.showLessSteps = true;
  }

  showAllClick() {
    this.showLessSteps = false;
  }

  findActiveStep(stepGroup: StepGroup) {
    const element = stepGroup.steps.find(step => {
      return step.status === ACTIVE;
    });
    return typeof element === 'undefined' ? false : true;
  }
}
