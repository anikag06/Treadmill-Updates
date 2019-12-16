import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrfSituationComponent } from './trf-situation.component';

describe('TrfSituationComponent', () => {
  let component: TrfSituationComponent;
  let fixture: ComponentFixture<TrfSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrfSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrfSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
