import {Component, ElementRef, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {MatSliderChange} from '@angular/material';

@Component({
    selector: 'app-form-slider',
    templateUrl: './form-slider.component.html',
    styleUrls: ['./form-slider.component.scss'],
})
export class FormSliderComponent implements OnInit {
    rating!: number;
    @Input() question!: string;
    @Input() minRatingText!: string;
    @Input() maxRatingText!: string;
    @Output() getRating = new EventEmitter();

    constructor(public element: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const track = this.element.nativeElement.querySelectorAll(
            '.mat-accent .mat-slider-track-fill',
        );
        const thumb = this.element.nativeElement.querySelectorAll(
            '.mat-accent .mat-slider-thumb',
        );
        const slider = this.element.nativeElement.querySelectorAll(
            '.mat-accent .mat-slider-thumb-label',
        );
        const labelText = this.element.nativeElement.querySelectorAll(
            '.mat-accent .mat-slider-thumb-label-text',
        );
        track[0].setAttribute('style', 'background-color: #2a3b3d');
        slider[0].setAttribute('style', 'background-color: #2a3b3d;');
        thumb[0].setAttribute('style', 'background-color: #2a3b3d');
        labelText[0].setAttribute('style', 'color:white;');
    }

    onInputChange(event: MatSliderChange) {
        this.getRating.emit(event.value || undefined);
    }
}
