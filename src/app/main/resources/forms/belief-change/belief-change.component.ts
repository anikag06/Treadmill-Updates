import {Component, OnInit} from '@angular/core';
import {BELIEF_CHANGE, BELIEF_CHANGE_FORM_NAME,} from '@/app.constants';

export interface Belief {
    id: string;
    belief: string;
}

@Component({
    selector: 'app-belief-change',
    templateUrl: './belief-change.component.html',
    styleUrls: ['./belief-change.component.scss'],
})
export class BeliefChangeComponent implements OnInit {
    constructor() {
    }

    formName = BELIEF_CHANGE_FORM_NAME;
    belief!: Belief | undefined;
    reset = false;
    type = BELIEF_CHANGE;
    showSlider = false;
    showTechniques = false;

    ngOnInit() {
    }

    onAddNewForm() {
        this.belief = undefined;
        this.reset = !this.reset;
    }

    beliefSelected(belief: Belief) {
        this.belief = belief;
    }

    onShowSlider() {
        this.showSlider = true;
    }

    onShowTechniques() {
        this.showTechniques = true;
    }
}
