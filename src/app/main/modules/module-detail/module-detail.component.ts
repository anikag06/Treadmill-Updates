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
export class ModuleDetailComponent implements OnInit, DoCheck {

  module!: Module;
  categories!: Category[];
  subscriptionRouter!: Subscription;
  selectedCategory!: Category | undefined;

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
        (module) =>  {
          this.module = <Module>module;
          this.categoryService.getCategories(this.module.id)
            .then((categories) => {
              this.categories = categories;
              this.selectedCategory = categories.find((category) => category.status === ACTIVE);
            });
        },
        (error) => {
          this.router.navigate(['modules']);
        }
      );
  }

  ngDoCheck(): void {
  }

  onCategorySelected(category: Category) {
    this.selectedCategory = category;
  }
}
