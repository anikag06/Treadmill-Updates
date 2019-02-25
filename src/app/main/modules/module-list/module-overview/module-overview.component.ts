import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';


import { Module } from '@/main/modules/module.model';
import { Category } from './category/category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss'],
  providers: [CategoryService]
})
export class ModuleOverviewComponent implements OnInit, DoCheck {

  backgroundImg: string = 'https://via.placeholder.com/600x300?text=TreadWill';
  @Input() module: Module = new Module("Loading..", "locked", this.backgroundImg);

  categories!: Category[];


  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((data) => this.categories = data)
  }

  ngDoCheck(): void {
    if(this.module && this.module.imageUrl) {
      this.backgroundImg = this.module.imageUrl;
    }
  }
}
