import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleItemComponent } from './module-item.component';
import { Module } from '../../module.model';
import { Category } from '@/main/shared/category.model';

describe('ModuleItemComponent', () => {
  let component: ModuleItemComponent;
  let fixture: ComponentFixture<ModuleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleItemComponent);
    component = fixture.componentInstance;
    component.module = new Module('basics', true, false, '', 1, [new Category('basics', true, false)]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
