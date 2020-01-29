import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPostComponent } from './suggested-post.component';

describe('SuggestedPostComponent', () => {
  let component: SuggestedPostComponent;
  let fixture: ComponentFixture<SuggestedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestedPostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
