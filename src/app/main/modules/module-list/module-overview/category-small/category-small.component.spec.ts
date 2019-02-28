import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySmallComponent } from './category-small.component';

describe('CategoryComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
