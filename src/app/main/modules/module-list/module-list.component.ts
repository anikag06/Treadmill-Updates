import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import 'rxjs';

import { Module } from '@/main/modules/module.model';
import { ModulesService } from '@/main/modules/modules.service';
import { ACTIVE, DONE } from '@/app.constants';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  providers: [ModulesService]
})
export class ModuleListComponent implements OnInit {

  activeModule$!: Observable<Module>; 
  allModules!: Module[];
  subscription!: Subscription;
  modules$!: Observable<Module[]>;

  constructor(
    private modulesService: ModulesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.modules$ = this.modulesService.getModulesObservable();
    this.activeModule$ = <Observable<Module>>this.modulesService.getModulesObservable()
      .pipe(
        map(modules => modules.find(module => module.status == ACTIVE))
      )
  }

  onModuleClick(module: Module) {
    if (module.status == DONE || module.status == ACTIVE) {
      this.router.navigate(['modules', module.slug])
    }
  }

}
