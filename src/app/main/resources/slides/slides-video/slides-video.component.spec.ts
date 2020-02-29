import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesVideoComponent } from './slides-video.component';

describe('SlidesVideoComponent', () => {
  let component: SlidesVideoComponent;
  let fixture: ComponentFixture<SlidesVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlidesVideoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
