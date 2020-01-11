import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  evidenceForm!: FormGroup;
  evidences!: FormArray;
  statements: string[] = [];
  ngOnInit() {
    this.evidenceForm = new FormGroup({
      evidences: this.fb.array([this.createItem()]),
    });
  }

  createItem(name = '') {
    return this.fb.group({
      statement: name,
    });
  }

  createEditItem(id = 0, name = '') {
    return this.fb.group({
      id: id,
      statement: name,
    });
  }

  addField() {
    const formArray = this.evidenceForm.get('evidences') as FormArray;
    formArray.push(this.createItem());
    // this.showTrashIcon.push(false);
    this.changeDetector.detectChanges();
  }

  getStatements() {
      return (<FormArray>this.evidenceForm.get('evidences')).controls;
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
    const formArray = this.evidenceForm.get('evidences') as FormArray;
    formArray.removeAt(index);
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

  updateValue(value: string) {
    this.statements.push(value);
    this.evidenceForm.setControl('evidences', this.fb.array(this.statements));
    this.valueUpdate.emit(this.evidenceForm);
  }
}
