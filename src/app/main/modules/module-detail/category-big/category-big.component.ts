import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Category } from '@/main/shared/category.model';
import { INTRODUCTION, ACTIVE, LEARN, DISCUSS, PRACTICE, LOCKED, DONE } from '@/app.constants';

@Component({
  selector: 'app-category-big',
  templateUrl: './category-big.component.html',
  styleUrls: ['./category-big.component.scss']
})
export class CategoryBigComponent implements OnInit {

  @Input() category!: Category;
  @Input() last!: string;
  @Input() first!: string;
  hover: boolean = false;
  imageUrl: string | undefined = '';

  constructor() { }

  ngOnInit() {
    this.imageUrl = this.imageUrlMapper();
  }

  imageUrlMapper() {
    if (this.category.name == INTRODUCTION && this.category.status == DONE && this.hover == true) {
      return "assets/modules/introduction-white.svg";
    } else if (this.category.name == LEARN && this.category.status == DONE && this.hover == true ) {
      return "assets/modules/learn-white.svg";
    } else if (this.category.name == DISCUSS && this.category.status == DONE && this.hover == true) {
      return "assets/modules/discuss-white.svg";
    } else if (this.category.name == PRACTICE && this.category.status == DONE && this.hover == true) {
      return "assets/modules/practice-white.svg";
    } else if (this.category.name == INTRODUCTION && this.category.status == ACTIVE && this.hover == true) {
      return "assets/modules/introduction-white.svg";
    } else if (this.category.name == LEARN && this.category.status == ACTIVE && this.hover == true ) {
      return "assets/modules/learn-white.svg";
    } else if (this.category.name == DISCUSS && this.category.status == ACTIVE && this.hover == true) {
      return "assets/modules/discuss-white.svg";
    } else if (this.category.name == PRACTICE && this.category.status == ACTIVE && this.hover == true) {
      return "assets/modules/practice-white.svg";
    } else if (this.category.name == INTRODUCTION && this.category.status == ACTIVE) {
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

  onMouseEnter() {
    this.hover = true;
    this.imageUrl = this.imageUrlMapper();
  }

  onMouseLeave() {
    this.hover = false;
    this.imageUrl = this.imageUrlMapper();
  }

}
