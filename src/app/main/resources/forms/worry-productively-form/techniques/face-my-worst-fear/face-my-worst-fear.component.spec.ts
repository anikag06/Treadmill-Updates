import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceMyWorstFearComponent } from './face-my-worst-fear.component';

describe('FaceMyWorstFearComponent', () => {
  let component: FaceMyWorstFearComponent;
  let fixture: ComponentFixture<FaceMyWorstFearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaceMyWorstFearComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceMyWorstFearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
