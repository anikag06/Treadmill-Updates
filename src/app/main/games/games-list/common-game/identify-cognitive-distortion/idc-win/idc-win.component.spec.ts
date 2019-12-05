import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcWinComponent } from './idc-win.component';

describe('IdcWinComponent', () => {
  let component: IdcWinComponent;
  let fixture: ComponentFixture<IdcWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
