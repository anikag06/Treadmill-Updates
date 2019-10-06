import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '@/main/shared/category.model';
import { INTRODUCTION, LEARN, DISCUSS, PRACTICE } from '@/app.constants';

@Component({
  selector: 'app-category-big',
  templateUrl: './category-big.component.html',
  styleUrls: ['./category-big.component.scss']
})
export class CategoryBigComponent implements OnInit {

  @Input() category!: Category;
  @Input() last!: string;
  @Input() first!: string;

  @Output() categorySelected = new EventEmitter<Category>();

  hover = false;
  imageUrl: string | undefined = '';

  constructor() { }

  ngOnInit() {
    this.imageUrl = this.imageUrlMapper();
  }

  imageUrlMapper() {
      if (this.category.name.toUpperCase() === INTRODUCTION && this.category.is_active === false && this.category.is_content_locked === false && this.hover == true) {
        return 'assets/modules/introduction-white.svg';
      } else if (this.category.name.toUpperCase() === LEARN && this.category.is_active === false && this.category.is_content_locked === false && this.hover == true ) {
        return 'assets/modules/learn-white.svg';
      } else if (this.category.name.toUpperCase() === DISCUSS && this.category.is_active === false && this.category.is_content_locked === false && this.hover == true) {
        return 'assets/modules/discuss-white.svg';
      } else if (this.category.name.toUpperCase() === PRACTICE && this.category.is_active === false && this.category.is_content_locked === false && this.hover == true) {
        return 'assets/modules/practice-white.svg';
      } else if (this.category.name.toUpperCase() === INTRODUCTION && this.category.is_active && this.hover === true) {
        return 'assets/modules/introduction-white.svg';
      } else if (this.category.name.toUpperCase() === LEARN && this.category.is_active && this.hover === true ) {
        return 'assets/modules/learn-white.svg';
      } else if (this.category.name.toUpperCase() === DISCUSS && this.category.is_active && this.hover === true) {
        return 'assets/modules/discuss-white.svg';
      } else if (this.category.name === PRACTICE && this.category.is_active && this.hover === true) {
        return 'assets/modules/practice-white.svg';
      } else if (this.category.name.toUpperCase() === INTRODUCTION && this.category.is_active === true) {
        return 'assets/modules/introduction-yellow.svg';
      } else if (this.category.name.toUpperCase() === LEARN && this.category.is_active === true) {
        return 'assets/modules/learn-yellow.svg';
      } else if (this.category.name.toUpperCase() === DISCUSS && this.category.is_active === true) {
        return 'assets/modules/discuss-yellow.svg';
      } else if (this.category.name.toUpperCase() === PRACTICE && this.category.is_active === true) {
        return 'assets/modules/practice-yellow.svg';
      } else if (this.category.name.toUpperCase() === INTRODUCTION && this.category.is_content_locked === true) {
        return 'assets/modules/introduction-disabled.svg';
      } else if (this.category.name.toUpperCase() === LEARN && this.category.is_content_locked === true) {
        return 'assets/modules/learn-disabled.svg';
      } else if (this.category.name.toUpperCase() === DISCUSS && this.category.is_content_locked === true) {
        return 'assets/modules/discuss-disabled.svg';
      } else if (this.category.name.toUpperCase() === PRACTICE && this.category.is_content_locked === true) {
        return 'assets/modules/practice-disabled.svg';
      } else if (this.category.name.toUpperCase() === INTRODUCTION && this.category.is_content_locked === false && this.category.is_active === false) {
        return 'assets/modules/introduction.svg';
      } else if (this.category.name.toUpperCase() === LEARN && this.category.is_content_locked === false && this.category.is_active === false) {
        return 'assets/modules/learn.svg';
      } else if (this.category.name.toUpperCase() === DISCUSS && this.category.is_content_locked === false && this.category.is_active === false) {
        return 'assets/modules/discuss.svg';
      } else if (this.category.name.toUpperCase() === PRACTICE && this.category.is_content_locked === false && this.category.is_active === false) {
        return 'assets/modules/practice.svg';
      }
  }

  onMouseEnter() {
    this.hover = true;
    this.imageUrl = this.imageUrlMapper();
  }

  onMouseLeave() {
    this.hover = false;
    this.imageUrl = this.imageUrlMapper();
  }

  onClick() {
    if (this.category.is_content_locked === false) {
      this.categorySelected.emit(this.category);
    }
  }

}
