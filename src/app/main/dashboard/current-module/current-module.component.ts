import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModulesService } from '@/main/modules/modules.service';
import { Observable, Subscription } from 'rxjs';
import { Module } from '@/main/modules/module.model';
import { map } from 'rxjs/operators';
import { ACTIVE } from '@/app.constants';
import { Category } from '@/main/shared/category.model';
import { CategoryService } from '@/main/shared/category.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-current-module',
  templateUrl: './current-module.component.html',
  styleUrls: ['./current-module.component.scss'],
  providers: [ModulesService, CategoryService],
  animations: [
    trigger( 'simpleAnimate', [
      state('initial', style({
        transform: 'scale(0.0)'
      })),
      state('rendered', style({
        transform: 'scale(1.0)'
      })),
      transition('initial => rendered', [
        animate(100)
      ])
    ])
  ]
})

export class CurrentModuleComponent implements OnInit, OnDestroy {

  module$!: Observable<Module>;
  categories$!: Promise<Category[]>;
  categorySubscription!: Subscription;
  animateAction = 'initial';

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
          this.categories$ = this.categoryService.getCategories(module.id);
          setTimeout(() => this.animateAction = 'rendered', 10);
      });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

}
