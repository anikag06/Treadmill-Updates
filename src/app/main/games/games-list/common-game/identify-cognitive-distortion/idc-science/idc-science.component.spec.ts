import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcScienceComponent } from './idc-science.component';

describe('IdcScienceComponent', () => {
  let component: IdcScienceComponent;
  let fixture: ComponentFixture<IdcScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcScienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
