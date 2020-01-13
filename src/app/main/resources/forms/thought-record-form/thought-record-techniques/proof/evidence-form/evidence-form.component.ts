import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-evidence-form',
  templateUrl: './evidence-form.component.html',
  styleUrls: ['./evidence-form.component.scss'],
})
export class EvidenceFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
  ) {}
  showTrashIcon: boolean[] = [];
  @Input() title!: string;
  @Output() valueUpdate = new EventEmitter();
  @Input() control!: FormArray;
  evidences!: FormArray;
  statements: string[] = [];
  ngOnInit() {}

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

  markForDeletion(subtask: any, index: number) {
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
    this.showTrashIcon.splice(index);
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

  // updateValue(value: string) {
  //   this.statements.push(value);
  //   this.evidenceForm.setControl('evidences', this.fb.array(this.statements));
  //   this.valueUpdate.emit(this.evidenceForm);
  // }
}
