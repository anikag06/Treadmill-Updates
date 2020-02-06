import {ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output,} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {IProofEvidences} from '@/main/resources/forms/shared/proof-evidences/IProofEvidences';

@Component({
  selector: 'app-evidences',
  templateUrl: './evidences.component.html',
  styleUrls: ['./evidences.component.scss'],
})
export class EvidencesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    @Inject('IProofEvidences')
    private providerService: IProofEvidences[],
  ) {}

  showTrashIcon: boolean[] = [];
  @Input() title!: string;
  @Output() valueUpdate = new EventEmitter();
  @Output() setSummary = new EventEmitter();
  @Input() control!: FormArray;
  @Input() type!: string;
  @Input() service!: number;
  evidences!: FormArray;
  statements: string[] = [];
  @Input() id!: number;

  ngOnInit() {
    //   if (this.id) {
    //     this.providerService[this.service]
    //       .getEvidences(this.id, this.type)
    //       .subscribe((object: any) => {
    //         if (object.evidences.length !== 0) {
    //           for (let i = 0; i < object.evidences.length; i++) {
    //             this.control.push(
    //               this.createEditItem(
    //                 object.evidences[i].id,
    //                 object.evidences[i].evidence,
    //               ),
    //             );
    //           }
    //           this.setSummary.emit();
    //         } else {
    //           this.control.push(this.createItem());
    //         }
    //       });
    //   } else {
    //     this.control.push(this.createItem());
    //   }
  }

  ngOnChanges() {
    if (this.id) {
      this.providerService[this.service]
        .getEvidences(this.id, this.type)
        .subscribe((object: any) => {
          if (object.evidences.length !== 0) {
            for (let i = 0; i < object.evidences.length; i++) {
              this.control.push(
                this.createEditItem(
                  object.evidences[i].id,
                  object.evidences[i].evidence,
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
      this.providerService[this.service]
        .deleteEvidence(evidence.value.id, this.type)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('deleted');
          }
        });
    }

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
