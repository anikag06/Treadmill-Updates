import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormTechniqueComponent} from './form-technique.component';

describe('FormTechniqueComponent', () => {
  let component: FormTechniqueComponent;
  let fixture: ComponentFixture<FormTechniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTechniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
