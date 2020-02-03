import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialPagesFooterComponent } from './trial-pages-footer.component';

describe('TrialPagesFooterComponent', () => {
  let component: TrialPagesFooterComponent;
  let fixture: ComponentFixture<TrialPagesFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrialPagesFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialPagesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
