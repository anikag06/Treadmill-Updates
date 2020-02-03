import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialPagesHeaderComponent } from './trial-pages-header.component';

describe('TrialPagesHeaderComponent', () => {
  let component: TrialPagesHeaderComponent;
  let fixture: ComponentFixture<TrialPagesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrialPagesHeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialPagesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
