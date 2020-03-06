import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-common-belief',
  templateUrl: './common-belief.component.html',
  styleUrls: ['./common-belief.component.scss'],
})
export class CommonBeliefComponent implements OnInit {
  radioSelected: string | undefined;
  beliefList = [
    'I am a loser.',
    'I am unlovable.',
    'I am worthless.',
    'I must always try to be perfect.',
    'Other people are to blame for my problems.',
    'The world should always meet my expectations',
    'I am basically defective and inferior to other people.',
    "I must always please people and live up to everyone's expectations.",
    " If someone criticizes me, it means there's something wrong with me",
    'If I worry or feel bad about a situation, it will somehow make things better.',
    ' I must have the love and approval of others before I can feel good about myself.',
    " I'm hopeless and bound to feel depressed forever because the problems in my life are impossible to solve.",
  ];

  constructor(public dialogRef: MatDialogRef<CommonBeliefComponent>) {}

  ngOnInit() {}

  onBeliefSelect() {
    const beliefData = {
      selectedBelief: this.radioSelected,
    };
    this.dialogRef.close({ event: 'close', data: beliefData });
  }
  closeCommonBelief() {
    this.dialogRef.close({ event: 'close' });
  }
}
