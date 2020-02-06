import {Component, Inject, Input, OnInit, SimpleChanges, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {IFormTechniqueServices} from '@/main/resources/forms/shared/form-technique/IFormTechniqueServices';

@Component({
  selector: 'app-form-technique',
  templateUrl: './form-technique.component.html',
  styleUrls: ['./form-technique.component.scss'],
})
export class FormTechniqueComponent implements OnInit {
  // techniqueName = 'Is this the only explanation?';
  // question = 'Can there be another explanation for this situation?';
  submitted = false;
  explanation = '';
  summary = '';
  updateText!: boolean;
  @Input() techniqueName!: string;
  @Input() question!: string;
  // @Input() reset!: boolean;
  @Input() id!: number;
  @Input() service!: number;
  @ViewChild('panel', { static: false }) panel!: any;
  @Input() headerColor!: string;

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
      this.providerService[this.service]
        .getData(this.id)
        .subscribe((resp: any) => {
          if (resp) {
            this.updateText = true;
            this.techniqueForm.controls['text'].setValue(resp.text);
            this.summary = resp.text;
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
          }
        });
    } else {
      this.providerService[this.service]
        .postData(this.id, data)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('post done');
          }
        });
    }
    this.summary = data;
    this.panel.expanded = false;
  }
}
