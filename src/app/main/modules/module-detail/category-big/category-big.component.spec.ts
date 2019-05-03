import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBigComponent } from './category-big.component';
import { Category } from '@/main/shared/category.model';

describe('CategoryBigComponent', () => {
  let component: CategoryBigComponent;
  let fixture: ComponentFixture<CategoryBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBigComponent);
    component = fixture.componentInstance;
    component.category = new Category('basics', true, false);
    component.first = 'first';
    component.last = 'last';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
