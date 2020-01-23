import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';

@Component({
    selector: 'app-negative-thought-card',
    templateUrl: './negative-thought-card.component.html',
    styleUrls: ['./negative-thought-card.component.scss'],
})
export class NegativeThoughtCardComponent implements OnInit {
    @Input() header!: string;
    @Input() reset!: boolean;
    submitted = false;
    minRating = 'Not At All';
    maxRating = 'Very Strongly';
    negativeMoodRating!: number;
    @Input() thought!: Thought;
    @ViewChild('thoughtTextArea', {static: false}) element!: ElementRef;
    @Output() onShowSelectMood = new EventEmitter();
    showSlider = false;

    thoughtRecordForm = this.fb.group({
        thought: new FormControl('', [Validators.required]),
    });

    scaleThought =
        'On a scale of 1-10 how strongly do you believe the thought to be true?';
    showContinueButton = false;
    showSliderButton = false;

    constructor(
        private fb: FormBuilder,
        private thoughtRecordService: ThoughtRecordService,
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.thought) {
            this.thoughtRecordService
                .getThought(this.thought.id)
                .subscribe((resp: any) => {
                    if (resp.ok) {
                        this.initializeThought(resp);
                    }
                });
        }
    }

    onEditSituationClick() {
        // this.submitted = false;
        this.element.nativeElement.focus();
        this.onShowContinueButton();
    }

    getRating(value: any) {
        this.negativeMoodRating = value;
        this.showSliderButton = true;
    }

    initializeThought(resp: any) {
        this.thoughtRecordForm.controls['thought'].setValue(resp.body.thought);
        if (resp.body.thought_rating_initial) {
            this.negativeMoodRating = resp.body.thought_rating_initial;
            this.showSlider = true;
            // this.showSliderButton = true;
            this.onShowSelectMood.emit();
        }
    }

    onThoughtSubmit() {
        const object = {
            situation_id: this.thought.id,
            thought: this.thoughtRecordForm.value['thought'],
        };
        if (this.negativeMoodRating > 0) {
            this.onThoughtRatingSubmit();
        } else {
            this.thoughtRecordService.postThought(object).subscribe((resp: any) => {
                // console.log('put request');
                const status = resp.ok;
                if (status) {
                    this.showContinueButton = false;
                    this.showSlider = true;
                    // this.onShowSelectMood.emit();
                }
            });
        }
    }

    onThoughtRatingSubmit() {
        const object = {
            situation_id: this.thought.id,
            thought: this.thoughtRecordForm.value['thought'],
            thought_rating_initial: this.negativeMoodRating,
        };
        // console.log(object);
        this.thoughtRecordService
            .putThoughtRating(object, this.thought.id)
            .subscribe((resp: any) => {
                const status = resp.ok;
                if (status) {
                    this.onShowSelectMood.emit();
                    this.showContinueButton = false;
                    this.showSliderButton = false;
                }
            });
    }

    onShowContinueButton() {
        this.showContinueButton = true;
    }

    updateThought() {
        if (this.thought) {
            this.onThoughtRatingSubmit();
        }
    }
}
