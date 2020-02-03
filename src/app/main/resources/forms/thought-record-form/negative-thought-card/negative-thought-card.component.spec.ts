import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeThoughtCardComponent } from './negative-thought-card.component';

describe('NegativeThoughtCardComponent', () => {
  let component: NegativeThoughtCardComponent;
  let fixture: ComponentFixture<NegativeThoughtCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NegativeThoughtCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegativeThoughtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
