import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcOptionsComponent } from './idc-options.component';

describe('IdcOptionsComponent', () => {
  let component: IdcOptionsComponent;
  let fixture: ComponentFixture<IdcOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
