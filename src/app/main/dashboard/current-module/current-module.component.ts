import { Component, OnInit } from '@angular/core';
import { ModulesService } from '@/main/modules/modules.service';
import { Observable } from 'rxjs';
import { Module } from '@/main/modules/module.model';
import { map } from 'rxjs/operators';
import { ACTIVE } from '@/app.constants';

@Component({
  selector: 'app-current-module',
  templateUrl: './current-module.component.html',
  styleUrls: ['./current-module.component.scss'],
  providers: [ModulesService]
})
export class CurrentModuleComponent implements OnInit {

  module$!: Observable<Module>;

  constructor(
    private modulesService: ModulesService
  ) { }

  ngOnInit() {
    this.module$ = <Observable<Module>>this.modulesService.getModulesObservable()
      .pipe(
        map(modules => modules.find(module => module.status === ACTIVE))
      );
  }

}
