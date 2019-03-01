import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { map, switchMap,  } from 'rxjs/operators';

import { Module } from '@/main/modules/module.model';
import { ModulesService } from '@/main/modules/modules.service';
import { CategoryService } from '@/main/shared/category.service';
import { Category } from '@/main/shared/category.model';
import { ACTIVE } from '@/app.constants';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
  providers: [ModulesService, CategoryService],
})
export class ModuleDetailComponent implements OnInit, DoCheck, OnDestroy {

  module!: Module;
  categories$!: Observable<Category[]>;
  subscriptionRouter!: Subscription;
  selectedCategory$!: Observable<Category>;

  constructor(
    private activateRoute: ActivatedRoute,
    private modulesService: ModulesService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptionRouter = this.activateRoute.params
      .pipe(
        map(v => v.name),
        switchMap(name => this.modulesService.getModuleObservable(name))
      )
      .subscribe(
        (module) => this.module = <Module>module,
        (error) => {
          this.router.navigate(["modules"]);
        }
      );
  }

  ngDoCheck(): void {
    if (this.module && !this.categories$) {
      this.categories$ = this.categoryService.getCategories(this.module.name)

    this.selectedCategory$ = <Observable<Category>>this.categoryService.getCategories(this.module.name)
      .pipe(
        map(categories => categories.find(category => category.status == ACTIVE))
      )
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionRouter)
      this.subscriptionRouter.unsubscribe();
  }

  onCategorySelected(category: Category) {
    this.selectedCategory$ = of(category);
  }
}
