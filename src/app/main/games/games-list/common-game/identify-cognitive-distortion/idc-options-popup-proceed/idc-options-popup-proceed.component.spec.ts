import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcOptionsPopupProceedComponent } from './idc-options-popup-proceed.component';

describe('IdcOptionsPopupProceedComponent', () => {
  let component: IdcOptionsPopupProceedComponent;
  let fixture: ComponentFixture<IdcOptionsPopupProceedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcOptionsPopupProceedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcOptionsPopupProceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
