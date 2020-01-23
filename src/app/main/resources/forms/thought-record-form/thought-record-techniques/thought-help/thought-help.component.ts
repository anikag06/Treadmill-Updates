import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ThoughtHelpService} from '@/main/resources/forms/thought-record-form/thought-record-techniques/thought-help/thought-help.service';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';

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
    canSolveQues =
        'Is there anything that I can do to solve what I am worried about?';
    yes = 'Great ! Think of a more balanced thought.';
    no = 'Okay';
    @ViewChild('panel', {static: false}) panel!: any;
    @Input() thought!: Thought;
    updateHelp = false;

    thoughtHelpForm = this.formBuilder.group({
        keepThought: new FormControl('', [Validators.required]),
        changeThought: new FormControl('', [Validators.required]),
        canSolve: new FormControl('', [Validators.required]),
    });

    constructor(
        private formBuilder: FormBuilder,
        private thoughtHelpService: ThoughtHelpService,
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.thought) {
            this.thoughtHelpService
                .getThoughtHelp(this.thought.id)
                .subscribe((resp: any) => {
                    if (resp.ok) {
                        this.updateHelp = true;
                        this.initializeHelp(resp);
                        this.summary = resp.body.change_thinking;
                    }
                });
        }
    }

    initializeHelp(resp: any) {
        this.thoughtHelpForm.controls['keepThought'].setValue(
            resp.body.keep_thinking,
        );
        this.thoughtHelpForm.controls['changeThought'].setValue(
            resp.body.change_thinking,
        );
        if (resp.body.changed_thinking_help) {
            this.thoughtHelpForm.controls['canSolve'].setValue(1);
        } else {
            this.thoughtHelpForm.controls['canSolve'].setValue(0);
        }
    }

    onSubmit() {
        // this.submitted = true;

        const object = {
            situation_id: this.thought.id,
            keep_thinking: this.thoughtHelpForm.value['keepThought'],
            change_thinking: this.thoughtHelpForm.value['changeThought'],
            changed_thinking_help: <number>this.thoughtHelpForm.value['canSolve'],
        };
        console.log(object);
        if (this.updateHelp && this.summary.length > 0) {
            this.thoughtHelpService
                .putThoughtHelp(object, this.thought.id)
                .subscribe((resp: any) => {
                    const status = resp.ok;
                    if (status) {
                        console.log('put done');
                    }
                });
        } else {
            this.thoughtHelpService.postThoughtHelp(object).subscribe((resp: any) => {
                const status = resp.ok;
                if (status) {
                    console.log('post done');
                }
            });
        }
        this.summary = this.thoughtHelpForm.value['changeThought'];
        this.panel.expanded = false;
    }
}
