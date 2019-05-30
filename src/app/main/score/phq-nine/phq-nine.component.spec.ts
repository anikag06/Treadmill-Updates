import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhqNineComponent } from './phq-nine.component';

describe('PhqNineComponent', () => {
  let component: PhqNineComponent;
  let fixture: ComponentFixture<PhqNineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhqNineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhqNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
