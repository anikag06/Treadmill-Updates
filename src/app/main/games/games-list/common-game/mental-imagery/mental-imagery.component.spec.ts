import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentalImageryComponent } from './mental-imagery.component';

describe('MentalImageryComponent', () => {
  let component: MentalImageryComponent;
  let fixture: ComponentFixture<MentalImageryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentalImageryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentalImageryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
