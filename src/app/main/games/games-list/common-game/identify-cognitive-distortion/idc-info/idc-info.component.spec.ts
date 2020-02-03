import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcInfoComponent } from './idc-info.component';

describe('IdcInfoComponent', () => {
  let component: IdcInfoComponent;
  let fixture: ComponentFixture<IdcInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
