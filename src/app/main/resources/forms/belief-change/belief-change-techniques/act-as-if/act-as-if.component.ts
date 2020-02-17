import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';
import {FormArray, FormBuilder, FormControl, Validators,} from '@angular/forms';
import {ActAsIfService} from '@/main/resources/forms/belief-change/belief-change-techniques/act-as-if/act-as-if.service';

@Component({
  selector: 'app-act-as-if',
  templateUrl: './act-as-if.component.html',
  styleUrls: ['./act-as-if.component.scss'],
})
export class ActAsIfComponent implements OnInit {
  techniqueName = "How would I act if I didn't have this belief?";
  showTrashIcon: boolean[] = [];
  summary = '';
  actAsIfForm = this.formBuilder.group({
    how_would_i_act: new FormControl('', [Validators.required]),
    would_it_help: new FormControl('', [Validators.required]),
    advantages: this.formBuilder.array([]),
  });
  @ViewChild('panel', { static: false }) panel!: any;
  @Output() triggerShowFinalBelief = new EventEmitter();
  advantageQues = 'What are the advantages having this belief?';
  acting_help = 'Would acting this way help me?';

  showAdvantages = false;

  editMode = false;
  yes = 'Great! Then act "As if" you don\'t have the negative belief.';
  no = 'Then continue to believe what you believe currently.';
  headerColor = '#FFFCE3';

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private actAsIfService: ActAsIfService,
    private element: ElementRef,
  ) {}

  @Input() belief!: Belief;
  editAct = false;
  showActContinue = false;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.belief) {
      this.resetForm();
      this.actAsIfService
        .getActingAsIf(this.belief.id)
        .subscribe((resp: any) => {
          if (resp.body.how_would_i_act) {
            this.editAct = true;
            this.initalizeActAsIf(resp);
          }
        });

      this.actAsIfService
        .getAdvantages(this.belief.id)
        .subscribe((resp: any) => {
          if (resp.body.data.advantages.length > 0) {
            resp.body.data.advantages.forEach((object: any) => {
              (this.actAsIfForm.controls.advantages as FormArray).push(
                this.createEditItem(object.id, object.advantage),
              );
              this.showTrashIcon.push(false);
            });
            this.triggerShowFinalBelief.emit();
          } else {
            this.actAsIfForm.controls.advantages = this.formBuilder.array([
              this.createItem(),
            ]);
          }
        });
    } else {
      this.actAsIfForm.controls.advantages = this.formBuilder.array([
        this.createItem(),
      ]);
    }
  }

  initalizeActAsIf(resp: any) {
    this.actAsIfForm.controls['how_would_i_act'].setValue(
      resp.body.how_would_i_act,
    );
    this.showAdvantages = true;
    this.editMode = true;
    this.summary = resp.body.how_would_i_act;
    if (
      resp.body.would_it_help !== undefined &&
      resp.body.would_it_help !== null
    ) {
      this.actAsIfForm.controls['would_it_help'].setValue(
        resp.body.would_it_help,
      );
      console.log(this.actAsIfForm.controls['would_it_help']);
    }
  }

  get getAdvantages() {
    return this.actAsIfForm.get('advantages') as FormArray;
  }

  get getRadio() {
    return this.actAsIfForm.get('would_it_help');
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
    if (this.belief && !this.editMode) {
      const object = {
        belief_id: this.belief.id,
        how_would_i_act: this.actAsIfForm.value['how_would_i_act'],
      };
      this.actAsIfService.postActAsIf(object).subscribe(resp => {
        if (resp.ok) {
          this.showActContinue = false;

          this.showAdvantages = true;
          this.editMode = true;
          // this.showRadioCntBtn = true;
        }
      });
    } else {
      const object = {
        belief_id: this.belief.id,
        how_would_i_act: this.actAsIfForm.value['how_would_i_act'],
        would_it_help: this.actAsIfForm.value['would_it_help'],
      };
      this.actAsIfService.putActAsIf(object, this.belief.id).subscribe(resp => {
        if (resp.ok) {
          this.onSubmitAdvantages();
        }
      });
    }
  }

  onSubmitAdvantages() {
    const advantages = {
      advantages: this.actAsIfForm.controls['advantages'].value,
    };

    this.actAsIfService
      .postAdvantages(advantages, this.belief.id)
      .subscribe(resp => {
        if (resp.ok) {
          this.panel.expanded = false;
          this.summary = this.actAsIfForm.value['how_would_i_act'];
          this.triggerShowFinalBelief.emit();
        }
      });
  }

  resetForm() {
    this.actAsIfForm = this.formBuilder.group({
      how_would_i_act: new FormControl('', [Validators.required]),
      would_it_help: new FormControl('', [Validators.required]),
      advantages: this.formBuilder.array([]),
    });
    this.summary = '';
  }
}
