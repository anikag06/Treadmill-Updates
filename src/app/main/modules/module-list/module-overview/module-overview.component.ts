import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Module } from '@/main/modules/module.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Category } from './category/category.model';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit, DoCheck {

  backgroundImg: string = 'https://via.placeholder.com/600x300?text=TreadWill';
  @Input() module: Module = new Module("Loading..", "locked", this.backgroundImg);

  categories: Category[] = [
    new Category("Introduction", "assets/modules/flag.svg", "done"),
    new Category("Learn", "assets/modules/docs.svg", "done"),
    new Category("Discuss", "assets/modules/conversation.svg", "active"),
    new Category("Practice", "assets/modules/practice.svg", "locked"),
  ];


  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if(this.module && this.module.imageUrl) {
      this.backgroundImg = this.module.imageUrl;
    }
  }
}
