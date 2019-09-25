import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFlowComponent } from './navbar-flow.component';

describe('NavbarFlowComponent', () => {
  let component: NavbarFlowComponent;
  let fixture: ComponentFixture<NavbarFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
