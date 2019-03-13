import { Component, OnInit, Input, DoCheck, OnDestroy } from '@angular/core';

import { Module } from '@/main/modules/module.model';
import { Category } from '@/main/shared/category.model';
import { CategoryService } from '@/main/shared/category.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss'],
  providers: [CategoryService]
})
export class ModuleOverviewComponent implements OnInit, DoCheck {

  backgroundImg = 'https://via.placeholder.com/600x300?text=TreadWill';
  @Input() module!: Module;
  @Input() completed!: boolean;
  subscription!: Subscription;

  categories$!: Observable<Category[]>;


  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit() {}

  ngDoCheck(): void {
    if (this.module && this.module.imageUrl) {
      this.backgroundImg = this.module.imageUrl;
    }
    if (this.module) {
      this.categories$ = this.categoryService.getCategories(this.module.name);
    }
  }
}
