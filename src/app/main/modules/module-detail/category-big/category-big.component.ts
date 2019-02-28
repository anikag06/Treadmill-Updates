import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@/main/shared/category.model';

@Component({
  selector: 'app-category-big',
  templateUrl: './category-big.component.html',
  styleUrls: ['./category-big.component.scss']
})
export class CategoryBigComponent implements OnInit {

  @Input() category!: Category;

  constructor() { }

  ngOnInit() {
  }

}
