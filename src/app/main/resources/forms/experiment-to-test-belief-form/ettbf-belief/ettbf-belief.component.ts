import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Belief } from '../belief.model';
import { ExperimentToTestBeliefService } from '../experiment-to-test-belief.service';

@Component({
  selector: 'app-ettbf-belief',
  templateUrl: './ettbf-belief.component.html',
  styleUrls: ['./ettbf-belief.component.scss']
})
export class EttbfBeliefComponent implements OnInit {

  @Input() belief!: Belief;
  @ViewChild('beliefTextArea', { static: false }) beliefTextArea!: ElementRef;
  beliefStatement = '';

  constructor(
    private testBeliefService: ExperimentToTestBeliefService
  ) { }

  ngOnInit() {
  }

  editBeliefText() {
    this.beliefTextArea.nativeElement.focus();
  }

  onBeliefSubmit() {
    // if (this.belief && Object.entries(this.belief).length > 0) {
    //   this.belief.belief = this.beliefStatement;
    //   this.testBeliefService.putBelief({id: this.belief.id, problem: this.beliefStatement})
    //     .subscribe(
    //       () => { },
    //       (error) => {
    //         console.error(error);
    //       }
    //     );
    // } else if (this.beliefStatement.trim().length > 0) {
    //   this.testBeliefService.postBelief(this.beliefStatement)
    //     .subscribe(
    //       () => { },
    //       (error) => {
    //         console.error(error);
    //       }
    //     );
    // }
    return true;
  }

  onFocusOut(event: any) {
    if (!((<Element>event.relatedTarget) && (<Element>event.relatedTarget).classList.contains('continue-btn'))) {
      this.onBeliefSubmit();
    }
  }
}
