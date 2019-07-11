import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSidebarComponent } from './forms-sidebar.component';

describe('FormsSidebarComponent', () => {
  let component: FormsSidebarComponent;
  let fixture: ComponentFixture<FormsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
