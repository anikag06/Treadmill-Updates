import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModulesService } from '@/main/modules/modules.service';
import { Observable, Subscription } from 'rxjs';
import { Module } from '@/main/modules/module.model';
import { map } from 'rxjs/operators';
import { ACTIVE } from '@/app.constants';
import { Category } from '@/main/shared/category.model';
import { CategoryService } from '@/main/shared/category.service';

@Component({
  selector: 'app-current-module',
  templateUrl: './current-module.component.html',
  styleUrls: ['./current-module.component.scss'],
  providers: [ModulesService, CategoryService]
})
export class CurrentModuleComponent implements OnInit, OnDestroy {

  module$!: Observable<Module>;
  categories$!: Observable<Category[]>;
  categorySubscription!: Subscription;

  constructor(
    private modulesService: ModulesService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.module$ = <Observable<Module>>this.modulesService.getModulesObservable()
      .pipe(
        map(modules => modules.find(module => module.status === ACTIVE))
      );
    this.categorySubscription = this.module$
        .subscribe((module) => {
            this.categories$ = this.categoryService.getCategories(module.name);
        });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

}
