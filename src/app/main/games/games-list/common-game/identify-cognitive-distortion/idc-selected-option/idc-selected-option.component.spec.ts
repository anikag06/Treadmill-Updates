import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcSelectedOptionComponent } from './idc-selected-option.component';

describe('IdcSelectedOptionComponent', () => {
  let component: IdcSelectedOptionComponent;
  let fixture: ComponentFixture<IdcSelectedOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcSelectedOptionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcSelectedOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
