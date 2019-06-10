import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSideListComponent } from './form-side-list.component';

describe('FormSideListComponent', () => {
  let component: FormSideListComponent;
  let fixture: ComponentFixture<FormSideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSideListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
