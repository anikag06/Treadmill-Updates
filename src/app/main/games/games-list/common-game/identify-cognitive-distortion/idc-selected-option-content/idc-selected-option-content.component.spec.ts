import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcSelectedOptionContentComponent } from './idc-selected-option-content.component';

describe('IdcSelectedOptionContentComponent', () => {
  let component: IdcSelectedOptionContentComponent;
  let fixture: ComponentFixture<IdcSelectedOptionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcSelectedOptionContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcSelectedOptionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
