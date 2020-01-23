import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {ProofBeliefService} from '@/main/resources/forms/belief-change/belief-change-techniques/proof-belief/proof-belief.service';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';

@Component({
    selector: 'app-belief-evidences',
    templateUrl: './belief-evidences.component.html',
    styleUrls: ['./belief-evidences.component.scss'],
})
export class BeliefEvidencesComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        private proofBeliefService: ProofBeliefService,
    ) {
    }

    showTrashIcon: boolean[] = [];
    @Input() title!: string;
    @Output() valueUpdate = new EventEmitter();
    @Output() setSummary = new EventEmitter();
    @Input() control!: FormArray;
    @Input() type!: string;
    evidences!: FormArray;
    statements: string[] = [];
    @Input() belief!: Belief;

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.belief) {
            this.proofBeliefService
                .getEvidences(this.belief.id, this.type)
                .subscribe((resp: any) => {
                    if (resp.body.data.evidences.length !== 0) {
                        for (let i = 0; i < resp.body.data.evidences.length; i++) {
                            this.control.push(
                                this.createEditItem(
                                    resp.body.data.evidences[i].id,
                                    resp.body.data.evidences[i].evidence,
                                ),
                            );
                        }
                        this.setSummary.emit();
                    } else {
                        this.control.push(this.createItem());
                    }
                });
        } else {
            this.control.push(this.createItem());
        }
    }

    createItem(name = '') {
        return this.fb.group({
            evidence: name,
        });
    }

    createEditItem(id = 0, name = '') {
        return this.fb.group({
            id: id,
            evidence: name,
        });
    }

    addField() {
        this.control.push(this.createItem());

        // this.showTrashIcon.push(false);
        this.changeDetector.detectChanges();
    }

    markForDeletion(evidence: any, index: number) {
        console.log(evidence.value.id);

        if (evidence.value.id) {
            this.proofBeliefService
                .deleteEvidence(evidence.value.id, this.type)
                .subscribe((resp: any) => {
                    const status = resp.ok;
                    if (status) {
                        console.log('deleted');
                    }
                });
        }
        // if (subtask.id) {
        //   let status;
        //   this.taskService
        //       .deleteSubTask(this.task.id, subtask.id)
        //       .subscribe((resp: any) => {
        //         this.tasksGroup.controls.subTasks = this.fb.array([]);
        //         this.task.sub_tasks = this.task.sub_tasks.filter(
        //             (st: UserSubTask) => st.id !== subtask.id
        //         );
        //         this.task.sub_tasks.forEach((stask: UserSubTask) => {
        //           (this.tasksGroup.controls.subTasks as FormArray).push(
        //               this.createEditItem(stask.id, stask.name, stask.is_completed)
        //           );
        //         });
        //         status = resp.body.status;
        //         if (status) {
        //           this.taskService.openSnackBar("Subtask deleted Successfully", "OK");
        //         } else {
        //           this.taskService.openSnackBar("Error Occured", "Retry");
        //         }
        //       });
        // }

        this.control.removeAt(index);
        this.showTrashIcon.splice(index, 1);
        this.changeDetector.detectChanges();
    }

    onClickOutside(event: Object, index: number) {
        if (event && (<any>event)['value'] === true) {
            this.showTrashIcon[index] = false;
        }
    }

    onShowTrashIcon(index: number) {
        this.showTrashIcon[index] = !this.showTrashIcon[index];
    }
}
