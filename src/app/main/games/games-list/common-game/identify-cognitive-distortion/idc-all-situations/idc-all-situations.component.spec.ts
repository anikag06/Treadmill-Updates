import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcAllSituationsComponent } from './idc-all-situations.component';

describe('IdcAllSituationsComponent', () => {
  let component: IdcAllSituationsComponent;
  let fixture: ComponentFixture<IdcAllSituationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcAllSituationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcAllSituationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
