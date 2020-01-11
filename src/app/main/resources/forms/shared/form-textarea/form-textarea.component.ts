import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: ' app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class FormTextareaComponent implements OnInit {
  @Input() question!: string;
  @Input() controlName!: string;

  constructor() {}

  ngOnInit() {
    console.log(this.controlName);
  }
}
