import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { Category } from '@/main/shared/category.model';
import { LEARN, INTRODUCTION, DISCUSS, PRACTICE } from '@/app.constants';

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

  imageUrl(): string {
    if (this.category.name === INTRODUCTION && this.category.is_active === true) {
      return 'assets/modules/introduction-yellow.svg';
    } else if (this.category.name === LEARN && this.category.is_active === true) {
      return 'assets/modules/learn-yellow.svg';
    } else if (this.category.name === DISCUSS && this.category.is_active === true) {
      return 'assets/modules/discuss-yellow.svg';
    } else if (this.category.name === PRACTICE && this.category.is_active === true) {
      return 'assets/modules/practice-yellow.svg';
    } else if (this.category.name === INTRODUCTION && this.category.is_content_locked === true) {
      return 'assets/modules/introduction-disabled.svg';
    } else if (this.category.name === LEARN && this.category.is_content_locked === true) {
      return 'assets/modules/learn-disabled.svg';
    } else if (this.category.name === DISCUSS && this.category.is_content_locked === true) {
      return 'assets/modules/discuss-disabled.svg';
    } else if (this.category.name === PRACTICE && this.category.is_content_locked === true) {
      return 'assets/modules/practice-disabled.svg';
    } else if (this.category.name === INTRODUCTION && this.category.is_content_locked === false && this.category.is_active === false) {
      return 'assets/modules/introduction.svg';
    } else if (this.category.name === LEARN && this.category.is_content_locked === false && this.category.is_active === false) {
      return 'assets/modules/learn.svg';
    } else if (this.category.name === DISCUSS && this.category.is_content_locked === false && this.category.is_active === false) {
      return 'assets/modules/discuss.svg';
    } // else if (this.category.name === PRACTICE && this.category.is_content_locked === false && this.category.is_active === false) {
      return 'assets/modules/practice.svg';
  }
}
