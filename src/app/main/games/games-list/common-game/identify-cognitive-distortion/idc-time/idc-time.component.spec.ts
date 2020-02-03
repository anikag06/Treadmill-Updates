import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcTimeComponent } from './idc-time.component';

describe('IdcTimeComponent', () => {
  let component: IdcTimeComponent;
  let fixture: ComponentFixture<IdcTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcTimeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
