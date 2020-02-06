import {Component, Input, OnInit, SimpleChanges, ViewChild,} from '@angular/core';

import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {IdentifyThinkingService} from '@/main/resources/forms/thought-record-form/thought-record-techniques/identify-thinking/identify-thinking.service';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {ThinkingErrorModel} from '@/main/resources/forms/thought-record-form/thought-record-techniques/identify-thinking/thinking-error.model';
import {TechniquesInfoComponent} from '@/main/resources/forms/shared/techniques-info/techniques-info.component';
import {MatDialog} from '@angular/material';
import {THINIKING_ERROR_DATA} from '@/main/resources/forms/shared/techniques-info/thinking-error-technique.data';

@Component({
  selector: 'app-identify-thinking',
  templateUrl: './identify-thinking.component.html',
  styleUrls: ['./identify-thinking.component.scss'],
})
export class IdentifyThinkingComponent implements OnInit {
  title = 'Can you identify the thinking errors in your negative thought?';
  errors: ThinkingErrorModel[] = [];
  errorCount = 0;
  thinkingError: string[] = [];
  summary = '';
  submitted = false;
  @Input() thought!: Thought;
  @Input() reset!: boolean;
  techniqueName = 'Identify Thinking Error';
  @ViewChild('panel', { static: false }) panel!: any;

  identifyThinkingForm = this.formBuilder.group({
    emotions: this.formBuilder.array([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private identifyThinkingService: IdentifyThinkingService,
    public dialog: MatDialog,
  ) {
    this.identifyThinkingService
      .getThinkingErrors()
      .subscribe((errors: any) => {
        errors.map((error: any) => {
          this.errors.push(new ThinkingErrorModel(error, false));
        });
      });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.thought) {
      this.identifyThinkingService
        .getSelectedThinkingErrors(this.thought.id)
        .subscribe((resp: any) => {
          if (resp.body.data) {
            this.setSummary(resp.body.data);
            this.identifyThinkingForm.setControl(
              'emotions',
              this.formBuilder.array(resp.body.data),
            );
            resp.body.data.forEach((data: any) => {
              // @ts-ignore
              const obj = this.errors.find((x, i) => {
                if (x.error === data) {
                  this.errors[i].isChecked = true;
                  this.errorCount += 1;
                  return true;
                }
              });
            });
          }
        });
    }
  }

  updateErrorCount(event: any, index: number) {
    const emotions = (<FormArray>(
      this.identifyThinkingForm.get('emotions')
    )) as FormArray;

    if (event.checked) {
      emotions.push(new FormControl(event.source.value));
      this.errorCount += 1;
    } else {
      const i = emotions.controls.findIndex(
        x => x.value === event.source.value,
      );
      emotions.removeAt(i);
      this.errorCount -= 1;
    }

    // this.thinkingError.push(this.errors[index]);

    // this.thinkingError.splice(index);
  }

  onSubmit() {
    const object = {
      thinking_errors: this.identifyThinkingForm.value['emotions'],
    };
    this.identifyThinkingService
      .postThinkingErrors(object, this.thought.id)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          this.submitted = true;
          this.setSummary(this.identifyThinkingForm.value['emotions']);
        }
      });

    this.panel.expanded = false;
  }

  setSummary(thinkingErrors: string[]) {
    this.summary = thinkingErrors.join(',');
    // this.changeDetector.detectChanges();
  }

  onShowInfo($event: Event) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: THINIKING_ERROR_DATA,
      },
    });
  }
}
