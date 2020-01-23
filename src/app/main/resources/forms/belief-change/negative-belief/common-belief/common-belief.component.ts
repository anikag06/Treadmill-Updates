import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-common-belief',
    templateUrl: './common-belief.component.html',
    styleUrls: ['./common-belief.component.scss'],
})
export class CommonBeliefComponent implements OnInit {
    radioSelected!: string;
    beliefList = [
        'Belief 1',
        'Belief 2',
        'Belief 1',
        'Belief 1',
        'Belief 1',
        'Belief 1',
        'Belief 1',
    ];

    constructor(public dialogRef: MatDialogRef<CommonBeliefComponent>) {
    }

    ngOnInit() {
    }

    onBeliefSelect() {
        const beliefData = {
            selectedBelief: this.radioSelected,
        };
        this.dialogRef.close({event: 'close', data: beliefData});
    }
}
