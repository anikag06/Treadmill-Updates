import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import 'rxjs';

import { Module } from '@/main/modules/module.model';
import { ModulesService } from '@/main/modules/modules.service';
import { ACTIVE, DONE, LOCKED, MOBILEWIDTH } from '@/app.constants';
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
  modulesDone$!: Observable<Module[]>;
  modulesLocked$!: Observable<Module[]>;
  mobileView = false;
  isCompleted$!: Observable<Boolean>;
  completed = false;

  constructor(
    private modulesService: ModulesService,
    private router: Router
  ) {
    if (window.innerWidth < MOBILEWIDTH) {
      this.mobileView = true;
    }
  }

  ngOnInit() {
    this.modules$ = this.modulesService.getModulesObservable();
    this.activeModule$ = <Observable<Module>>this.modulesService.getModulesObservable()
      .pipe(
        map(modules => modules.find(module => module.status === ACTIVE))
      );
    this.modulesDone$ = <Observable<Module[]>>this.modulesService.getModulesObservable()
      .pipe(
        map(modules => modules.filter(module =>  module.status === DONE || module.status === ACTIVE ))
      );
    this.modulesLocked$ = <Observable<Module[]>>this.modulesService.getModulesObservable()
      .pipe(
        map(modules => modules.filter(module => module.status === LOCKED))
      );
    this.isCompleted$ = this.modulesService.isCompleted();
  }

  onModuleClick(module: Module) {
    if (module.status === DONE || module.status === ACTIVE) {
      this.router.navigate(['modules', module.slug]);
    }
  }

}
