import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcSituationComponent } from './idc-situation.component';

describe('IdcSituationComponent', () => {
  let component: IdcSituationComponent;
  let fixture: ComponentFixture<IdcSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcSituationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
