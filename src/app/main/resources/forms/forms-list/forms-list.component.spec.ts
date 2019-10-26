import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsListComponent } from './forms-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FormsListComponent', () => {
  let component: FormsListComponent;
  let fixture: ComponentFixture<FormsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
