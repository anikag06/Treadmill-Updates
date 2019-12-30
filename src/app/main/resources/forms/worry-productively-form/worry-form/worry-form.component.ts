import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Worry } from '../worry.model';
import { ProblemSolvingWorksheetsService } from '../../problem-solving-worksheets/problem-solving-worksheets.service';
// import { Problem } from '../problem-solving-worksheets/problem.model';

@Component({
  selector: 'app-worry-form',
  templateUrl: './worry-form.component.html',
  styleUrls: ['./worry-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorryFormComponent implements OnInit {
  @Input() problem!: Worry;
  @Output() testOut = new EventEmitter<boolean>();
  @ViewChild('problemTextArea', { static: false }) problemTextArea!: ElementRef;
  problemStatement = '';

  constructor(private problemService: ProblemSolvingWorksheetsService) {}

  ngOnInit() {
    if (this.problem) {
      this.problemStatement = this.problem.problem;
      // this.problem.isDisabled=false;
    }
  }
  ngAfterViewInit() {
    if (this.problem && this.problemTextArea) {
      setTimeout(() => {
        this.editProblemText();
      }, 100);
    }
  }

  editProblemText() {
    this.problemTextArea.nativeElement.focus();
    // this.problem.isDisabled=false;
  }
  public Cbutton = false;
  onProblemSubmit() {
    // this.problem.isDisabled=false;
    if (this.problem && Object.entries(this.problem).length > 0) {
      this.problem.problem = this.problemStatement;
      this.problemService
        .putProblem({
          id: this.problem.id,
          problem: this.problemStatement,
          bestsolution: null,
          taskorigin: 0,
        })
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          error => {
            console.error(error);
          },
        );
    } else if (this.problemStatement.trim().length > 0) {
      this.problemService.postProblem(this.problemStatement).subscribe(
        (data: any) => {
          console.log(data);
        },
        error => {
          console.error(error);
        },
      );
    }
    this.Cbutton = true;
    this.testOut.emit(this.Cbutton);
  }

  //   AfterClick( data : boolean ){
  //     //     this.problem.isDisabled=true;

  //    return this.testOut.emit(this.Cbutton);
  // //     console.log('slider') ;
  // }
  //
  onFocusOut(event: any) {
    if (
      !(
        <Element>event.relatedTarget &&
        (<Element>event.relatedTarget).classList.contains('continue-btn')
      )
    ) {
      this.onProblemSubmit();
    }
  }
}
