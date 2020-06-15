import { Component, OnInit } from '@angular/core';
import { FormsService } from '@/main/forms.service';
import { Router } from '@angular/router';
import {FormService} from '@/main/resources/forms/form.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss'],
})
export class FormsListComponent implements OnInit {
  constructor(private formsService: FormsService, private formService: FormService,
              private router: Router) {}

  forms: any = [];

  ngOnInit() {
    this.forms = this.formsService.forms;
  }
  navigate(form: any) {
    this.router.navigateByUrl(form.path);
  }
}
