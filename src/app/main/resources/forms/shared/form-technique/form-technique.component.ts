import {Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {IFormTechniqueServices} from '@/main/resources/forms/shared/form-technique/IFormTechniqueServices';
import {SUMMARY} from '@/app.constants';

@Component({
  selector: 'app-form-technique',
  templateUrl: './form-technique.component.html',
  styleUrls: ['./form-technique.component.scss'],
})
export class FormTechniqueComponent implements OnInit {
  submitted = false;
  explanation = '';
  summary = '';
  updateText!: boolean;
  summaryHeading = SUMMARY;
  @Input() techniqueName!: string;
  @Input() question!: string;
  @Input() summaryIndex!: number;
  // @Input() reset!: boolean;
  @Input() id!: number;
  @Input() service!: number;
  @ViewChild('panel', { static: false }) panel!: any;
  @Input() headerColor!: string;
  @Output() showFinal = new EventEmitter();
  @Output() techniqueExpanded = new EventEmitter();
  @Output() techniqueCollapsed = new EventEmitter();
  techniqueForm = this.formBuilder.group({
    text: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    @Inject('IFormTechniqueServices')
    private providerService: IFormTechniqueServices[],
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.id) {
      this.resetForm();
      this.providerService[this.service]
        .getData(this.id)
        .subscribe((resp: any) => {
          if (resp.text) {
            this.updateText = true;
            this.techniqueForm.controls['text'].setValue(resp.text);
            this.setSummary(resp.text);
          }
        });
    }
  }

  onSubmit() {
    this.submitted = true;
    const data = this.techniqueForm.value['text'];

    if (this.updateText) {
      this.providerService[this.service]
        .putData(this.id, data)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('put done');
            this.setSummary(data);
          }
        });
    } else {
      this.providerService[this.service]
        .postData(this.id, data)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            this.updateText = true;
            console.log('post done');

            this.setSummary(data);
          }
        });
    }
  }

  setSummary(data: string) {
    this.summary = data;
    this.panel.expanded = false;
    this.showFinal.emit();
    this.panelCollapse();
  }

  resetForm() {
    this.techniqueForm = this.formBuilder.group({
      text: new FormControl(''),
    });
    this.summary = '';
    delete this.updateText;
  }

  panelCollapse() {
    const object = {
      index: this.summaryIndex,
      summary: this.summary ? this.summary : '',
    };
    this.techniqueCollapsed.emit(object);
  }
}
