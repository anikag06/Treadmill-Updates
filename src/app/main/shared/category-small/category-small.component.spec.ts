import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySmallComponent } from './category-small.component';
import { Category } from '../category.model';

describe('CategorySmallComponent', () => {
  let component: CategorySmallComponent;
  let fixture: ComponentFixture<CategorySmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySmallComponent);
    component = fixture.componentInstance;
    component.category = new Category('learn', true, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
