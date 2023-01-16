import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiimsRegistrationComponent } from './aiims-registration.component';

describe('AiimsRegistrationComponent', () => {
  let component: AiimsRegistrationComponent;
  let fixture: ComponentFixture<AiimsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiimsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiimsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
