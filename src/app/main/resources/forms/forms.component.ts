import { Component, OnInit } from '@angular/core';
import { FormsService } from '@/main/forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  constructor(
    private formsService: FormsService
  ) { }

  forms: any = [];

  ngOnInit() {
    this.forms = this.formsService.forms;
  }

}
