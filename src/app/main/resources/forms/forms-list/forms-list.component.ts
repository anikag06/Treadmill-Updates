import { Component, OnInit } from '@angular/core';
import { FormsService } from '@/main/forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss'],
})
export class FormsListComponent implements OnInit {
  constructor(private formsService: FormsService) {}

  forms: any = [];

  ngOnInit() {
    this.forms = this.formsService.forms;
  }
}
