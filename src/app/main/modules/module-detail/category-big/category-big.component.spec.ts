import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBigComponent } from './category-big.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
