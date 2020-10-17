import { Injectable } from '@angular/core';
import { SupportGroupIntroComponent } from '@/main/walk-through/support-group-intro/support-group-intro.component';
import { IntroSelectTagsComponent } from '@/main/walk-through/intro-select-tags/intro-select-tags.component';
import {
  FORM_BELIEF_CHANGE,
  FORM_EXPERIMENT_TO_TEST_BELIEF,
  FORM_PROBLEM_SOLVING,
  FORM_TASK,
  FORM_THOUGHT_RECORD,
  FORM_WORRY_PRODUCTIVELY,
  GAME_ATTRIBUTION_STYLE_CONSTANT,
  GAME_EXECUTIVE_CONTROL_CONSTANT,
  GAME_FRIENDLY_FACE_CONSTANT,
  GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT,
  GAME_INTERPRETATION_BIAS_CONSTANT,
  GAME_LEARNED_HELPLESSNESS_CONSTANT,
  GAME_MENTAL_IMAGERY_CONSTANT,
  MOBILE_WIDTH,
} from '@/app.constants';
import { MatDialog } from '@angular/material/dialog';
import { IntroDialogComponent } from '@/main/walk-through/intro-dialog/intro-dialog.component';
import { GameIntroComponent } from '@/main/walk-through/game-intro/game-intro.component';
import { FormIntroComponent } from '@/main/walk-through/form-intro/form-intro.component';
import { IntroService } from '@/main/walk-through/intro.service';
import {
  BELIEF_CHANGE_FORM,
  EXPERIMENT_TO_TEST_BELIEF_FORM,
  GAME_ATTRIBUTION_STYLE,
  GAME_EXECUTIVE_CONTROL,
  GAME_FRIENDLY_FACE,
  GAME_IDENTIFY_COGNITIVE_DISTORTION,
  GAME_INTERPRETATION_BIAS,
  GAME_LEARNED_HELPLESSNESS,
  GAME_MENTAL_IMAGERY,
  PROBLEM_SOLVING_FORM,
  TASK_FORM,
  THOUGHT_RECORD_FORM,
  WORRY_PRODUCTIVELY_FORM,
} from '@/main/walk-through/intro.constant';
import { ResourcesIntroComponent } from '@/main/walk-through/resources-intro/resources-intro.component';

@Injectable({
  providedIn: 'root',
})
export class IntroDialogService {
  constructor(public dialog: MatDialog, private introService: IntroService) {}

  buttonHTML =
    "   Next <span [ngStyle]=\"{fontSize: '40px',verticalAlign:'sub'}\"> &#8594;</span>";

  openIntroDialog() {
    const dialogRef = this.dialog.open(IntroDialogComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.introService.startIntro();
    });
  }

  openGameIntroDialog(fromFlow: boolean, name: String) {
    let game: any;
    if (name === GAME_INTERPRETATION_BIAS_CONSTANT) {
      game = GAME_INTERPRETATION_BIAS;
    } else if (name === GAME_EXECUTIVE_CONTROL_CONSTANT) {
      game = GAME_EXECUTIVE_CONTROL;
    } else if (name === GAME_LEARNED_HELPLESSNESS_CONSTANT) {
      game = GAME_LEARNED_HELPLESSNESS;
    } else if (name === GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT) {
      game = GAME_IDENTIFY_COGNITIVE_DISTORTION;
    } else if (name === GAME_ATTRIBUTION_STYLE_CONSTANT) {
      game = GAME_ATTRIBUTION_STYLE;
    } else if (name === GAME_FRIENDLY_FACE_CONSTANT) {
      game = GAME_FRIENDLY_FACE;
    } else if (name === GAME_MENTAL_IMAGERY_CONSTANT) {
      game = GAME_MENTAL_IMAGERY;
    }

    const dialogRef = this.dialog.open(GameIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
      data: {
        buttonText: fromFlow ? this.buttonHTML : 'Done',
        game: game,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (fromFlow) {
        this.introService.callNavBarGameIntro();
      }
    });
  }

  openFormIntroDialog(fromFlow: boolean, name: string) {
    let form: any;
    if (name === FORM_PROBLEM_SOLVING) {
      form = PROBLEM_SOLVING_FORM;
    } else if (name === FORM_TASK) {
      form = TASK_FORM;
    } else if (name === FORM_THOUGHT_RECORD) {
      form = THOUGHT_RECORD_FORM;
    } else if (name === FORM_EXPERIMENT_TO_TEST_BELIEF) {
      form = EXPERIMENT_TO_TEST_BELIEF_FORM;
    } else if (name === FORM_WORRY_PRODUCTIVELY) {
      form = WORRY_PRODUCTIVELY_FORM;
    } else if (name === FORM_BELIEF_CHANGE) {
      form = BELIEF_CHANGE_FORM;
    }
    const dialogRef = this.dialog.open(FormIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
      data: {
        buttonText: fromFlow ? this.buttonHTML : 'Done',
        form: form,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (fromFlow) {
        this.introService.callNavbarFormIntro();
      }
    });
  }

  openSupportGroupIntroDialog(fromFlow: boolean) {
    const dialogRef = this.dialog.open(SupportGroupIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
    });
    dialogRef.afterClosed().subscribe(result => {
      const dialogRefIntro = this.dialog.open(IntroSelectTagsComponent, {
        panelClass: 'intro-tag-dialog',
        autoFocus: false,
        maxWidth: window.innerWidth < MOBILE_WIDTH ? '340px' : '70%',
        maxHeight: '600px',
        disableClose: true,
        data: {
          fromFLow: fromFlow,
        },
      });
    });
  }

  openResourceIntro(fromFlow: boolean, description: string) {
    const dialogRef = this.dialog.open(ResourcesIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
      data: {
        buttonText: fromFlow ? this.buttonHTML : 'Done',
        description: description,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (fromFlow) {
        this.introService.callNavbarResourceIntro();
      }
    });
  }
}
