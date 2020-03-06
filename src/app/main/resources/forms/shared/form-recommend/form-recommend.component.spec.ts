import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecommendComponent } from './form-recommend.component';

describe('FormRecommendComponent', () => {
  let component: FormRecommendComponent;
  let fixture: ComponentFixture<FormRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormRecommendComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
