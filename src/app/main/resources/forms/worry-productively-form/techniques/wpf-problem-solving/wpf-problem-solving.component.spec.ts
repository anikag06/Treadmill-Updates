import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpfProblemSolvingComponent } from './wpf-problem-solving.component';

describe('WpfProblemSolvingComponent', () => {
  let component: WpfProblemSolvingComponent;
  let fixture: ComponentFixture<WpfProblemSolvingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WpfProblemSolvingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpfProblemSolvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
