import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiimsStepLastPageComponent } from './aiims-step-last-page.component';

describe('AiimsStepLastPageComponent', () => {
  let component: AiimsStepLastPageComponent;
  let fixture: ComponentFixture<AiimsStepLastPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AiimsStepLastPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiimsStepLastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
