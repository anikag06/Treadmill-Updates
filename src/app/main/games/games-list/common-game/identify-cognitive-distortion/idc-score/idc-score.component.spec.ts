import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcScoreComponent } from './idc-score.component';

describe('IdcScoreComponent', () => {
  let component: IdcScoreComponent;
  let fixture: ComponentFixture<IdcScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdcScoreComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
