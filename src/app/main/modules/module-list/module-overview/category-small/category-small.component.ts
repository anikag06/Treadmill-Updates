import { Component, OnInit, Input } from '@angular/core';

import { Category } from '@/main/shared/category.model';
import { LEARN, ACTIVE, INTRODUCTION, DISCUSS, PRACTICE, LOCKED, DONE } from '@/app.constants';

@Component({
  selector: 'app-category-small',
  templateUrl: './category-small.component.html',
  styleUrls: ['./category-small.component.scss']
})
export class CategorySmallComponent implements OnInit {

  @Input() category!: Category;
  @Input() first!: string;
  @Input() last!: string;

  constructor() { }

  ngOnInit() {
  }

  imageUrl() {
    if (this.category.name == INTRODUCTION && this.category.status == ACTIVE) {
      return "assets/modules/introduction-active.svg";
    } else if (this.category.name == LEARN && this.category.status == ACTIVE) {
      return "assets/modules/learn-active.svg";
    } else if (this.category.name == DISCUSS && this.category.status == ACTIVE) {
      return "assets/modules/discuss-active.svg";
    } else if (this.category.name == PRACTICE && this.category.status == ACTIVE) {
      return "assets/modules/practice-active.svg";
    } else if (this.category.name == INTRODUCTION && this.category.status == LOCKED) {
      return "assets/modules/introduction-disabled.svg";
    } else if (this.category.name == LEARN && this.category.status == LOCKED) {
      return "assets/modules/learn-disabled.svg";
    } else if (this.category.name == DISCUSS && this.category.status == LOCKED) {
      return "assets/modules/discuss-disabled.svg";
    } else if (this.category.name == PRACTICE && this.category.status == LOCKED) {
      return "assets/modules/practice-disabled.svg";
    } else if (this.category.name == INTRODUCTION && this.category.status == DONE) {
      return "assets/modules/introduction.svg";
    } else if (this.category.name == LEARN && this.category.status == DONE) {
      return "assets/modules/learn.svg";
    } else if (this.category.name == DISCUSS && this.category.status == DONE) {
      return "assets/modules/discuss.svg";
    } else if (this.category.name == PRACTICE && this.category.status == DONE) {
      return "assets/modules/practice.svg";
    } 
    
  }
}
