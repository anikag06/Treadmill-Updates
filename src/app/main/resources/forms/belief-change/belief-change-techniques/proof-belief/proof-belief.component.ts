import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild,} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {FormArray, FormBuilder} from '@angular/forms';
import {ProofBeliefService} from '@/main/resources/forms/belief-change/belief-change-techniques/proof-belief/proof-belief.service';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';

@Component({
    selector: 'app-proof-belief',
    templateUrl: './proof-belief.component.html',
    styleUrls: ['./proof-belief.component.scss'],
})
export class ProofBeliefComponent implements OnInit {
    favorTitle = 'What are the evidences supporting this belief?';
    againstTitle = 'What are the evidences against this belief?';
    summary = '';
    forType = 'for';
    againstType = 'against';
    @ViewChild('autosize', {static: false}) autosize!: CdkTextareaAutosize;
    submitted = false;
    @Input() belief!: Belief;
    @ViewChild('panel', {static: false}) panel!: any;

    proofStatementForm = this.fb.group({
        favorEvidences: this.fb.array([]),
        againstEvidences: this.fb.array([]),
    });

    ngAfterViewInit(): void {
        const panel = this.element.nativeElement.querySelectorAll(
            '.mat-expansion-panel-body',
        );
        panel[0].setAttribute('style', 'padding: 0px 0px 0px 16px');
    }

    constructor(
        private fb: FormBuilder,
        private element: ElementRef,
        private proofBeliefService: ProofBeliefService,
        private changeDetector: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges() {

        if (this.belief) {
            this.proofBeliefService
                .getEvidences(this.belief.id, this.againstType)
                .subscribe((resp: any) => {
                    if (resp.body.data.evidences.length !== 0) {
                        this.summary = resp.body.data.evidences[0].evidence;
                    }
                });
            if (this.summary.length === 0) {
                this.proofBeliefService
                    .getEvidences(this.belief.id, this.forType)
                    .subscribe((resp: any) => {
                        if (resp.body.data.evidences.length !== 0) {
                            this.summary = resp.body.data.evidences[0].evidence;
                        }
                    });
            }
        }
    }

    get favorEvidences(): FormArray {
        return this.proofStatementForm.get('favorEvidences') as FormArray;
    }

    get againstEvidences(): FormArray {
        return this.proofStatementForm.get('againstEvidences') as FormArray;
    }

    onSubmit() {
        this.submitted = true;

        const forEvidences = {
            evidences: this.proofStatementForm.controls['favorEvidences'].value,
        };

        const agaisntEvidences = {
            evidences: this.proofStatementForm.controls['againstEvidences'].value,
        };

        this.callPostEvidences(forEvidences, this.forType);
        this.callPostEvidences(agaisntEvidences, this.againstType);

        this.setSummary();
        this.panel.expanded = false;
    }

    callPostEvidences(evidences: any, type: string) {
        this.proofBeliefService
            .postEvidences(evidences, this.belief.id, type)
            .subscribe((resp: any) => {
                const status = resp.ok;
                if (status) {
                    console.log('post done');
                }
            });
    }

    setSummary() {
        if (this.proofStatementForm.controls['againstEvidences'].value[0]) {
            this.summary = this.proofStatementForm.controls[
                'againstEvidences'
                ].value[0].evidence;
        } else if (this.proofStatementForm.controls['favorEvidences'].value[0]) {
            this.summary = this.proofStatementForm.controls[
                'favorEvidences'
                ].value[0].evidence;
        }
        this.changeDetector.detectChanges();
    }
}
