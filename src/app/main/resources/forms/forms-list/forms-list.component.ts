import { Component, OnInit } from '@angular/core';
import { FormsService } from '@/main/forms.service';
import { Router } from '@angular/router';
import { FormService } from '@/main/resources/forms/form.service';
import { IntroService } from '@/main/walk-through/intro.service';
import { IntroDialogService } from '@/main/walk-through/intro-dialog.service';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss'],
})
export class FormsListComponent implements OnInit {
  user!: User;
  showLoading = true;

  constructor(
    private formsService: FormsService,
    private formService: FormService,
    private router: Router,
    private introService: IntroService,
    private introDialogService: IntroDialogService,
    private authService: AuthService,
  ) {
    this.user = <User>this.authService.isLoggedIn();
  }

  forms: any = [];

  ngOnInit() {
    this.forms = this.formsService.forms;
  }

  navigate(form: any) {
    this.formService.formName = form.name;
    this.formService.formTitle.emit();

    if (this.user.is_exp) {
      this.introService.showAnimation(form.slug).subscribe((data: any) => {
        if (data.show_animation) {
          setTimeout(() => {
            this.introDialogService.openFormIntroDialog(false, form.slug);
          }, 1000);
        }
      });
    }
    this.router.navigateByUrl(form.path);
  }
  removeLoading() {
    setTimeout( () => {
      this.showLoading = false;
    }, 100);
  }
}
