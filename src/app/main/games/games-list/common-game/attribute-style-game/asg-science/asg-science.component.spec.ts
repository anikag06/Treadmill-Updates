import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsgScienceComponent } from './asg-science.component';

describe('AsgScienceComponent', () => {
  let component: AsgScienceComponent;
  let fixture: ComponentFixture<AsgScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsgScienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsgScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
