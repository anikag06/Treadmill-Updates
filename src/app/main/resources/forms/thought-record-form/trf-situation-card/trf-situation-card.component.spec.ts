import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrfSituationCardComponent } from './trf-situation-card.component';

describe('FormCardComponent', () => {
  let component: TrfSituationCardComponent;
  let fixture: ComponentFixture<TrfSituationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrfSituationCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrfSituationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
