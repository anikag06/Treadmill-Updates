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
  @Input() worry!: Worry;
  @Output() testOut = new EventEmitter<boolean>();
  @ViewChild('worryTextArea', { static: false }) worryTextArea!: ElementRef;
  constructor(private problemService: ProblemSolvingWorksheetsService) {}
  worryStatement = '';
  
  public clickbutton = false;

  ngOnInit() {
    if (this.worry) {
      this.worryStatement = this.worry.problem;
      // this.problem.isDisabled=false;
    }
  }
  ngAfterViewInit() {
    if (this.worry && this.worryTextArea) {
      setTimeout(() => {
        this.editWorryText();
      }, 100);
    }
  }

  editWorryText() {
    this.worryTextArea.nativeElement.focus();
    // this.problem.isDisabled=false;
  }
  onWorrySubmit() {
    // this.problem.isDisabled=false;
    // if (this.problem && Object.entries(this.problem).length > 0) {
    //   this.problem.problem = this.worryStatement;
    //   this.problemService
    //     .putProblem({
    //       id: this.problem.id,
    //       problem: this.worryStatement,
    //       bestsolution: null,
    //       taskorigin: 0,
    //     })
    //     .subscribe(
    //       (data: any) => {
    //         console.log(data);
    //       },
    //       error => {
    //         console.error(error);
    //       },
    //     );
    // } else if (this.worryStatement.trim().length > 0) {
    //   this.problemService.postProblem(this.worryStatement).subscribe(
    //     (data: any) => {
    //       console.log(data);
    //     },
    //     error => {
    //       console.error(error);
    //     },
    //   );
    // }
    this.clickbutton = true;
    this.testOut.emit(this.clickbutton);
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
      this.onWorrySubmit();
    }
  }
}
