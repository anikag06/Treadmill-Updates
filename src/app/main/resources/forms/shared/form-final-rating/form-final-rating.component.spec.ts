import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinalRatingComponent } from './form-final-rating.component';

describe('FormFinalRatingComponent', () => {
  let component: FormFinalRatingComponent;
  let fixture: ComponentFixture<FormFinalRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormFinalRatingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFinalRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
