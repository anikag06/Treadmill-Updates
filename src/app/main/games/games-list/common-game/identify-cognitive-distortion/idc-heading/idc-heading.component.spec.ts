import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdcHeadingComponent } from './idc-heading.component';

describe('IdcHeadingComponent', () => {
  let component: IdcHeadingComponent;
  let fixture: ComponentFixture<IdcHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdcHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdcHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
