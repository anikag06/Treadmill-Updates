import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-form-card',
    templateUrl: './form-card.component.html',
    styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent implements OnInit {
    @Input() header!: string;
    @Output() showNegative = new EventEmitter();
    @Output() onShowSlider = new EventEmitter();
    @Output() onShowTechniques = new EventEmitter();
    @Input() apiToCall: string | undefined;
    @Input() thought!: any;
    @Input() reset!: boolean;
    @Input() editBehavior = false;
    @Output() updateThought = new EventEmitter();
    @ViewChild('textArea', {static: false}) element!: ElementRef;
    showContinue = false;
    submitted = false;

    constructor(
        // public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private thoughtRecordService: ThoughtRecordService,
    ) {
    }

    formCardGroup = this.formBuilder.group({
        text: new FormControl('', [Validators.required]),
    });

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            this.thought &&
            changes.thought &&
            changes.thought.previousValue !== changes.thought.currentValue
        ) {
            this.initializeTextArea();
        }
        if (changes.reset) {
            this.resetText();
    }
  }

  onEditSituationClick() {
      // this.submitted = false;
    this.element.nativeElement.focus();
  }

  loadSituation() {
    this.thoughtRecordService.getThoughts();
    this.thoughtRecordService.thoughtsBehaviour.subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.thought = data.find((t: Thought) => {
            if (this.thought.id === t.id) {
              return t;
            }
          });
            if (this.thought) {
                this.initializeTextArea();
            }
        }
      },
        (error: HttpErrorResponse) => {
        },
    );
  }

    initializeTextArea() {
        if (this.apiToCall === 'situation') {
            this.formCardGroup.controls['text'].setValue(this.thought.situation);
            this.showNegative.emit(true);
        }
        if (this.apiToCall === 'behavior') {
            this.thoughtRecordService.getBehavior(this.thought.id).subscribe(resp => {
                if (resp.ok) {
                    this.formCardGroup.controls['text'].setValue(resp.body.behavior);
                    this.editBehavior = true;
                    this.onShowTechniques.emit(true);
                }
            });
        }
    }

  updateText() {
      console.log(this.thought);
      if (this.thought) {
          this.saveData();
      }
  }

  saveData() {
    if (this.apiToCall === 'situation') {
      this.saveSituation();
    }
    if (this.apiToCall === 'behavior') {
      this.saveBehavior();
    }
  }

  saveSituation() {
    const object = {
        situation: this.formCardGroup.value['text'],
    };
    if (this.thought && this.thought.id > 0) {
      this.thoughtRecordService
        .putSituation(object, this.thought.id)
        .subscribe(resp => {
            status = resp.body.status;
            this.showContinue = false;
        });
    } else {
        this.thoughtRecordService.postSituation(object).subscribe(resp => {
            const status = resp.ok;
            if (status) {
                this.updateThought.emit(resp.body);
                this.textSituationHandler(resp.body, 'create');
            }
        });
    }
  }

    // saveThought() {
    //   const object = {
    //     situation_id: this.thought.id,
    //     thought: this.thoughtRecordForm.value['text'],
    //   };
    //   if (this.thought && this.thought.id > 0) {
    //     this.thoughtRecordService.postThought(object).subscribe(resp => {
    //       const status = resp.ok;
    //       if (status) {
    //         const object = {
    //           showSlider: true,
    //           negativeThought: resp.body.thought,
    //         };
    //         this.onShowSlider.emit(object);
    //       }
    //     });
    //   }
    // }

    saveBehavior() {
        // console.log(this.thought);
        if (this.thought) {
            const object = {
                situation_id: this.thought.id,
                behavior: this.formCardGroup.value['text'],
            };
            console.log(this.editBehavior);
            if (this.thought && this.thought.id > 0 && this.editBehavior) {
                this.thoughtRecordService
                    .putBehavior(object, this.thought.id)
                    .subscribe(resp => {
                        status = resp.body.status;
                        this.showContinue = false;
                        console.log(this.showContinue);
                    });
            } else {
                this.thoughtRecordService.postBehavior(object).subscribe(resp => {
                    const status = resp.ok;
                    if (status) {
                        this.onShowTechniques.emit(true);
                        this.editBehavior = true;
                    }
                });
            }
        }
    }

  textSituationHandler(data: any, action: string) {
    if (action === 'create') {
      this.thought = new Thought(data.id, data.situation);
      this.thoughtRecordService.addSituation(this.thought);

      this.showNegative.emit(true);
      // this.hideNextStep = true;
    } else {
      const thought = this.thoughtRecordService.thoughts.find(
        (t: Thought) => t.id === +data.id,
      );
      if (thought) {
        this.thought = <Thought>data;
        this.thoughtRecordService.updateSituation(this.thought);
      }
    }
  }

    onTextSubmit() {
        this.saveData();

        // this.onShowTechniques.emit(true);
    }

    onShowContinueButton() {
        this.showContinue = true;
    }

    resetText() {
        delete this.submitted;
        delete this.thought;
        this.formCardGroup = this.formBuilder.group({
            text: new FormControl(''),
        });
    }
}
