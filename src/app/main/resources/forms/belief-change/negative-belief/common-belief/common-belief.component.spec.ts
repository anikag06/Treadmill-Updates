import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBeliefComponent } from './common-belief.component';

describe('CommonBeliefComponent', () => {
  let component: CommonBeliefComponent;
  let fixture: ComponentFixture<CommonBeliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommonBeliefComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBeliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
