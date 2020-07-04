import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReregistrationComponent } from './reregistration.component';

describe('ReregistrationComponent', () => {
  let component: ReregistrationComponent;
  let fixture: ComponentFixture<ReregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
