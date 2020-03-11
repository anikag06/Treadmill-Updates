import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingItemComponent } from './reading-item.component';

describe('ReadingItemComponent', () => {
  let component: ReadingItemComponent;
  let fixture: ComponentFixture<ReadingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
