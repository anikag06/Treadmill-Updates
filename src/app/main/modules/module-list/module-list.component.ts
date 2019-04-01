import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import 'rxjs';

import { Module } from '@/main/modules/module.model';
import { ModulesService } from '@/main/modules/modules.service';
import { MOBILEWIDTH } from '@/app.constants';
import { map } from 'rxjs/operators';
import { Category } from '@/main/shared/category.model';
import { CategoryService } from '@/main/shared/category.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  providers: [ModulesService, CategoryService]
})
export class ModuleListComponent implements OnInit {

  activeModule!: Module | undefined;
  allModules!: Module[];
  subscription!: Subscription;
  modules$!: Observable<Module[]>;
  modulesDone$!: Observable<Module[]>;
  modulesLocked$!: Observable<Module[]>;
  mobileView = false;
  isCompleted$!: Observable<Boolean>;
  completed = false;
  dataFetched!: boolean;
  categories!: Category[];

  constructor(
    private modulesService: ModulesService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    if (window.innerWidth < MOBILEWIDTH) {
      this.mobileView = true;
    }
  }

  ngOnInit() {
    this.getModulesAndCategories()
      .then(
        (data) => {
          this.dataFetched = true;
        }
      );
  }

  onModuleClick(module: Module) {
    if (module.is_active || module.is_completed) {
      this.router.navigate(['modules', module.slug]);
    }
  }


  async getModulesAndCategories() {
    this.modules$ = this.modulesService.getModules();
    this.modulesDone$ = <Observable<Module[]>>this.modules$
      .pipe(
        map(modules => modules.filter(module =>  module.is_completed || module.is_active ))
      );
    this.modulesLocked$ = <Observable<Module[]>>this.modules$
      .pipe(
        map(modules => modules.filter(module => module.is_active === false && module.is_completed === false))
      );

    this.isCompleted$ = this.modulesService.isCompleted();

    this.activeModule = await this.modules$
      .pipe(
        map(modules => modules.find(module => module.is_active))
      ).toPromise();

    return Promise.all([true]);
  }

}
