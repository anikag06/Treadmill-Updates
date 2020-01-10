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
import { WorryProductivelyService } from '../worry-productively.service';

@Component({
  selector: 'app-worry-form',
  templateUrl: './worry-form.component.html',
  styleUrls: ['./worry-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorryFormComponent implements OnInit {
c 
  @Output() testOut = new EventEmitter<boolean>();
  @ViewChild('worryTextArea', { static: false }) worryTextArea!: ElementRef;
  constructor(private worryService: WorryProductivelyService) {}
  worryStatement = '';
  
  public clickbutton = false;

  ngOnInit() {
    if (this.worry) {
      this.worryStatement = this.worry.worry;
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
  }
  onWorrySubmit() {
    if (this.worry && Object.entries(this.worry).length > 0) {
      this.worry.worry = this.worryStatement;
      // this.worryService
      //   .putProblem({
      //     id: this.worry.id,
      //     problem: this.worryStatement,
      //     // bestsolution: null,
      //     // taskorigin: 0,
      //   })
      //   .subscribe(
      //     (data: any) => {
      //       console.log(data);
      //     },
      //     error => {
      //       console.error(error);
      //     },
      //   );
    } else if (this.worryStatement.trim().length > 0) {
      this.worryService.postWorry(this.worryStatement).subscribe(
        (data: any) => {
          console.log(data);
        },
        error => {
          console.error(error);
        },
      );
    }
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
