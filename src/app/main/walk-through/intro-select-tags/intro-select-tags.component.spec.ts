import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSelectTagsComponent } from './intro-select-tags.component';

describe('IntroSelectTagsComponent', () => {
  let component: IntroSelectTagsComponent;
  let fixture: ComponentFixture<IntroSelectTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntroSelectTagsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroSelectTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
