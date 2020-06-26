import { Component, OnInit } from '@angular/core';
import { FormsService } from '@/main/forms.service';
import { Router } from '@angular/router';
import { FormService } from '@/main/resources/forms/form.service';
import { IntroService } from '@/main/walk-through/intro.service';
import { IntroDialogService } from '@/main/walk-through/intro-dialog.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss'],
})
export class FormsListComponent implements OnInit {
  constructor(
    private formsService: FormsService,
    private formService: FormService,
    private router: Router,
    private introService: IntroService,
    private introDialogService: IntroDialogService,
  ) {}

  forms: any = [];

  ngOnInit() {
    this.forms = this.formsService.forms;
  }
  navigate(form: any) {
    this.formService.formName = form.name;
    this.formService.formTitle.emit();

    this.introService.showAnimation(form.slug).subscribe((data: any) => {
      if (data.show_animation) {
        setTimeout(() => {
          this.introDialogService.openFormIntroDialog(false);
        }, 1000);
      }
    });
    this.router.navigateByUrl(form.path);
  }
}
