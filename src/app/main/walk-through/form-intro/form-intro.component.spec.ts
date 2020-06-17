import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIntroComponent } from './form-intro.component';

describe('FormIntroComponent', () => {
  let component: FormIntroComponent;
  let fixture: ComponentFixture<FormIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
