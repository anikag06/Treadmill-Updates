import { Component, OnInit } from '@angular/core';
import { FormsService } from '@/main/forms.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { TREADWILL } from '@/app.constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(
    private formsService: FormsService,
    private loadFileService: LoadFilesService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Forms | ' + TREADWILL);
  }

  forms: any = [];

  ngOnInit() {
    this.forms = this.formsService.forms;
    this.loadFileService
      .loadExternalScript('./assets/forms/forms-preload-assets.js')
      .then(() => {})
      .catch(() => {});
  }
}
