import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Module } from '@/main/modules/module.model';
import { ModulesService } from '@/main/modules/modules.service';
import { CategoryService } from '@/main/shared/category.service';
import { Category } from '@/main/shared/category.model';

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
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionRouter)
      this.subscriptionRouter.unsubscribe();
  }
}
