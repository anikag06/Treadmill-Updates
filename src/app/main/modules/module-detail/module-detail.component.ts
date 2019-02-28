import { Component, OnInit, AfterContentInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '@/main/shared/category.service';
import { Category } from '@/main/shared/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
  providers: [ModulesService, CategoryService],
})
export class ModuleDetailComponent implements OnInit, DoCheck {

  module!: Module;
  categories!: Category[];
  subscription!: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private modulesService: ModulesService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activateRoute.params
      .pipe(
        map(v => v.name),
        switchMap(name => this.modulesService.getModuleObservable(name))
      )
      .subscribe(
        (module) => this.module = <Module>module,
        (error) => {
          this.router.navigate(["modules"])
        }
      );
  }

  ngDoCheck(): void {
    if (this.module && !this.subscription) {
      this.subscription = this.categoryService.getCategories(this.module.name)
                            .subscribe(data => this.categories = data)
    }
  }

}
