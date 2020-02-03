import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcPopupComponent } from './idc-popup.component';

describe('IdcPopupComponent', () => {
  let component: IdcPopupComponent;
  let fixture: ComponentFixture<IdcPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
