import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyCognitiveDistortionComponent } from './identify-cognitive-distortion.component';

describe('IdentifyCognitiveDistortionComponent', () => {
  let component: IdentifyCognitiveDistortionComponent;
  let fixture: ComponentFixture<IdentifyCognitiveDistortionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentifyCognitiveDistortionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyCognitiveDistortionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
