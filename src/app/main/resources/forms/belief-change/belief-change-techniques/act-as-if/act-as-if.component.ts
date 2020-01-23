import {ChangeDetectorRef, Component, Input, OnInit, ViewChild,} from '@angular/core';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';
import {FormArray, FormBuilder, FormControl, Validators,} from '@angular/forms';
import {ActAsIfService} from '@/main/resources/forms/belief-change/belief-change-techniques/act-as-if/act-as-if.service';

@Component({
    selector: 'app-act-as-if',
    templateUrl: './act-as-if.component.html',
    styleUrls: ['./act-as-if.component.scss'],
})
export class ActAsIfComponent implements OnInit {
    techniqueName = 'How would I act if I didn\'t have this belief?';
    showTrashIcon: boolean[] = [];
    summary!: string;
    actAsIfForm = this.formBuilder.group({
        how_would_i_act: new FormControl('', [Validators.required]),
        would_it_help: new FormControl('', [Validators.required]),
        advantages: this.formBuilder.array([]),
    });
    @ViewChild('panel', {static: false}) panel!: any;
    advantageQues = 'What are the advantages having this belief?';
    acting_help = 'Would acting this way help me?';

    constructor(
        private formBuilder: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        private actAsIfService: ActAsIfService,
    ) {
    }

    @Input() belief!: Belief;
    editAct = false;
    showActContinue = false;

    ngOnInit() {
    }

    ngOnChanges() {
        const formArray = this.getAdvantages;
        if (this.belief) {
            this.actAsIfService
                .getAdvantages(this.belief.id)
                .subscribe((resp: any) => {
                    if (resp.body.data.advantages.length !== 0) {
                        for (let i = 0; i < resp.body.data.advantages.length; i++) {
                            formArray.push(
                                this.createEditItem(
                                    resp.body.data.advantages[i].id,
                                    resp.body.data.advantages[i].advantage,
                                ),
                            );
                        }
                    } else {
                        console.log(formArray);
                        formArray.push(this.createItem());
                    }
                });
            this.actAsIfService
                .getActingAsIf(this.belief.id)
                .subscribe((resp: any) => {
                    if (resp.body.how_would_i_act) {
                        this.editAct = true;
                        this.initalizeActAsIf(resp);
                    }
                });
        } else {
            // console.log(formArray);
            formArray.push(this.createItem());
        }
    }

    initalizeActAsIf(resp: any) {
        this.actAsIfForm.controls['how_would_i_act'].setValue(
            resp.body.how_would_i_act,
        );
        this.summary = resp.body.how_would_i_act;
        if (resp.body.would_it_help) {
            this.actAsIfForm.controls['would_it_help'].setValue(1);
        } else {
            this.actAsIfForm.controls['would_it_help'].setValue(0);
        }
    }

    get getAdvantages() {
        return this.actAsIfForm.get('advantages') as FormArray;
    }

    markForDeletion(advantage: any, index: number) {
        if (advantage.value.id) {
            this.actAsIfService
                .deleteAdvantage(advantage.value.id)
                .subscribe((resp: any) => {
                    const status = resp.ok;
                    if (status) {
                        console.log('deleted');
                    }
                });
        }

        const formArray = this.getAdvantages;
        formArray.removeAt(index);
        this.showTrashIcon.splice(index, 1);
        this.changeDetector.detectChanges();
    }

    addField() {
        const formArray = this.getAdvantages;
        formArray.push(this.createItem());
        this.showTrashIcon.push(false);
        this.changeDetector.detectChanges();
    }

    createItem(advantage = '') {
        return this.formBuilder.group({
            advantage: advantage,
        });
    }

    createEditItem(id = 0, advantage = '') {
        return this.formBuilder.group({
            id: id,
            advantage: advantage,
        });
    }

    onClickOutside(event: Object, index: number) {
        if (event && (<any>event)['value'] === true) {
            this.showTrashIcon[index] = false;
        }
    }

    onShowTrashIcon(index: number) {
        this.showTrashIcon[index] = !this.showTrashIcon[index];
    }

    onShowActBtn() {
        this.showActContinue = true;
    }

    onSubmit() {
        if (this.belief) {
            const object = {
                belief_id: this.belief.id,
                how_would_i_act: this.actAsIfForm.value['how_would_i_act'],
            };
            this.actAsIfService.postActAsIf(object).subscribe(resp => {
                if (resp.ok) {
                    this.showActContinue = false;
                }
            });
        }
    }

    onActSubmit() {
        if (this.belief) {
            const object = {
                belief_id: this.belief.id,
                how_would_i_act: this.actAsIfForm.value['how_would_i_act'],
                would_it_help: <number>this.actAsIfForm.value['would_it_help'],
            };
            this.actAsIfService.putActAsIf(object, this.belief.id).subscribe(resp => {
                if (resp.ok) {
                }
            });

            const advantages = {
                advantages: this.actAsIfForm.controls['advantages'].value,
            };
            this.actAsIfService
                .postAdvantages(advantages, this.belief.id)
                .subscribe(resp => {
                    if (resp.ok) {
                        this.panel.expanded = false;
                        this.summary = this.actAsIfForm.value['how_would_i_act'];
                    }
                });
        }
    }
}
