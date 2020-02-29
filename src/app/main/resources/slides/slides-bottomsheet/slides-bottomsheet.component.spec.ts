import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesBottomsheetComponent } from './slides-bottomsheet.component';

describe('SlidesBottomsheetComponent', () => {
  let component: SlidesBottomsheetComponent;
  let fixture: ComponentFixture<SlidesBottomsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlidesBottomsheetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
