import {Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {IFinalRatingServices} from '@/main/resources/forms/shared/form-final-rating/IFinalRatingServices';

@Component({
  selector: 'app-form-final-rating',
  templateUrl: './form-final-rating.component.html',
  styleUrls: ['./form-final-rating.component.scss'],
})
export class FormFinalRatingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    @Inject('IFinalRatingServices')
    private providerService: IFinalRatingServices[],
  ) {}

  @Input() header!: string;
  minRating = 'Not at all';
  maxRating = 'Very Strongly';
  finalRating!: number;
  @Input() realisticQuestion!: string;
  @Input() original_title!: string;
  @Input() initialRating!: number;
  showRealistic = false;
  showContinue = false;
  @Input() object!: any;
  @Input() reset!: boolean;
  @Output() finalRatingChange = new EventEmitter();
  @Output() formComplete = new EventEmitter();
  showQuote = false;
  editRealistic = false;
  editSlider = false;
  showRealisticDiv = false;
  finalRatingForm = this.formBuilder.group({
    realistic: new FormControl('', [Validators.required]),
  });
  @Input() service!: number;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.object && this.reset) {
      this.providerService[this.service]
        .getFinalRating(this.object.id)
        .subscribe((data: any) => {
          if (data.final_rating) {
            this.finalRating = data.final_rating;
            this.finalRatingChange.emit(this.finalRating);
            this.showContinue = false;
            this.editSlider = true;
            // this.showRealistic = true;
            if (this.initialRating > this.finalRating) {
              this.showRealisticDiv = true;
              this.providerService[this.service]
                .getRealistic(this.object.id)
                .subscribe((data: any) => {
                  if (data.realistic) {
                    this.finalRatingForm.controls['realistic'].setValue(
                      data.realistic,
                    );
                    this.showRealistic = false;
                    this.editRealistic = true;
                    this.formComplete.emit(this.finalRating);
                  }
                });
            } else {
              this.formComplete.emit(this.finalRating);
            }
          }
        });
    }
    if (this.reset) {
      this.resetForm();
    }
  }

  getRating(value: any) {
    this.finalRating = value;
    this.showContinue = true;
  }

  onFinalRatingSubmit() {
    if (this.editSlider && this.object) {
      this.providerService[this.service]
        .putFinalRating(this.object.id, this.finalRating)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.showContinue = false;
            if (this.initialRating > this.finalRating) {
              this.showRealisticDiv = true;
            } else {
              this.showRealisticDiv = false;
              this.formComplete.emit(this.finalRating);
            }
            this.finalRatingChange.emit(this.finalRating);
          }
        });
    } else {
      this.providerService[this.service]
        .postFinalRating(this.object.id, this.finalRating)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.showContinue = false;
            this.showRealistic = false;
            if (this.initialRating > this.finalRating) {
              this.showRealisticDiv = true;
            } else {
              this.formComplete.emit(this.finalRating);
            }
            this.editSlider = true;
            this.finalRatingChange.emit(this.finalRating);
          }
        });
    }
  }

  onRealisticBeliefSubmit() {
    const realistic = this.finalRatingForm.value['realistic'];
    if (this.editRealistic && this.object) {
      this.providerService[this.service]
        .putRealistic(this.object.id, realistic)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.formComplete.emit(this.finalRating);
            this.showRealistic = false;
          }
        });
    } else {
      this.providerService[this.service]
        .postRealistic(this.object.id, realistic)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.formComplete.emit(this.finalRating);
            this.showRealistic = false;
          }
        });
    }
  }

  showRealisticBtn() {
    this.showRealistic = true;
  }

  resetForm() {
    this.finalRatingForm = this.formBuilder.group({
      realistic: new FormControl('', [Validators.required]),
    });
  }
}
