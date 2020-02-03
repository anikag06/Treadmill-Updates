import { Component, Input, OnInit } from '@angular/core';
import { FormMessage } from '@/main/resources/forms/shared/form-message/form-message.model';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.scss'],
})
export class FormMessageComponent implements OnInit {
  constructor() {}
  @Input() formMessage!: FormMessage;
  ngOnInit() {}
}
