import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcMainComponent } from './idc-main.component';

describe('IdcMainComponent', () => {
  let component: IdcMainComponent;
  let fixture: ComponentFixture<IdcMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
