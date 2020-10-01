import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThoughtHelpService } from '@/main/resources/forms/thought-record-form/thought-record-techniques/thought-help/thought-help.service';
import { Thought } from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import { SUMMARY } from '@/app.constants';

@Component({
  selector: 'app-thought-help',
  templateUrl: './thought-help.component.html',
  styleUrls: ['./thought-help.component.scss'],
})
export class ThoughtHelpComponent implements OnInit {
  techniqueName = 'Does this thought help me?';
  submitted = false;
  summary = '';
  keepThoughtQues = 'What will happen if you keep thinking this way?';
  changeThoughtQues = 'What could happen if you changed this thought?';
  canSolveQues = 'Would it help me to change the thought?';
  yes =
    '<img src="assets/forms/well_done.png" height="16px" > Great! Think of a more balanced thought.';
  no = 'Okay.';
  summaryHeading = SUMMARY;
  @ViewChild('panel', { static: false }) panel!: any;
  @Input() thought!: Thought;
  @Output() showFinalThought = new EventEmitter();
  @Output() techniqueExpanded = new EventEmitter();
  @Output() techniqueCollapsed = new EventEmitter();
  @Input() summaryIndex!: number;
  @Input() reset!: boolean;
  updateHelp = false;

  thoughtHelpForm = this.formBuilder.group({
    keepThought: new FormControl('', [Validators.required]),
    changeThought: new FormControl('', [Validators.required]),
    canSolve: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private thoughtHelpService: ThoughtHelpService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.thought && this.reset) {
      this.thoughtHelpService
        .getThoughtHelp(this.thought.id)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.updateHelp = true;
            this.initializeHelp(resp);
            this.setSummary();
          }
        });
    }
    if (this.reset) {
      this.resetForm();
    }
  }

  initializeHelp(resp: any) {
    this.thoughtHelpForm.controls['keepThought'].setValue(
      resp.body.keep_thinking
    );
    this.thoughtHelpForm.controls['changeThought'].setValue(
      resp.body.change_thinking
    );
    this.thoughtHelpForm.controls['canSolve'].setValue(
      resp.body.changed_thinking_help
    );
  }

  onSubmit() {
    // this.submitted = true;

    const object = {
      situation_id: this.thought.id,
      keep_thinking: this.thoughtHelpForm.value['keepThought'],
      change_thinking: this.thoughtHelpForm.value['changeThought'],
      changed_thinking_help: <number>this.thoughtHelpForm.value['canSolve'],
    };

    if (this.updateHelp && this.summary.length > 0) {
      this.thoughtHelpService
        .putThoughtHelp(object, this.thought.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            this.setSummary();
          }
        });
    } else {
      this.thoughtHelpService.postThoughtHelp(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          this.setSummary();
          this.updateHelp = true;
        }
      });
    }
  }

  setSummary() {
    this.summary = this.thoughtHelpForm.value['changeThought'];
    this.showFinalThought.emit();
    this.panel.expanded = false;
    this.panelCollapse();
  }

  resetForm() {
    this.thoughtHelpForm = this.formBuilder.group({
      keepThought: new FormControl(''),
      changeThought: new FormControl(''),
      canSolve: new FormControl(''),
    });
    this.summary = '';
  }
  panelCollapse() {
    const object = {
      index: this.summaryIndex,
      summary: this.summary ? this.summary : '',
    };
    this.techniqueCollapsed.emit(object);
  }
}
