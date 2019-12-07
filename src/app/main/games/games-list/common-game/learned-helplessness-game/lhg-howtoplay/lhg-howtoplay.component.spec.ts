import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LhgHowtoplayComponent } from './lhg-howtoplay.component';

describe('LhgHowtoplayComponent', () => {
  let component: LhgHowtoplayComponent;
  let fixture: ComponentFixture<LhgHowtoplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LhgHowtoplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LhgHowtoplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
