import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPostItemComponent } from './suggested-post-item.component';

describe('SuggestedPostItemComponent', () => {
  let component: SuggestedPostItemComponent;
  let fixture: ComponentFixture<SuggestedPostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedPostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
