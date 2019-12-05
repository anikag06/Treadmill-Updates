import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcOptionSolutionComponent } from './idc-option-solution.component';

describe('IdcOptionSolutionComponent', () => {
  let component: IdcOptionSolutionComponent;
  let fixture: ComponentFixture<IdcOptionSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcOptionSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcOptionSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
