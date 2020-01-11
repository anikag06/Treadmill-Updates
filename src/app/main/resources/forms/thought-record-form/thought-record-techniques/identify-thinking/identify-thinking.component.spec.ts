import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyThinkingComponent } from './identify-thinking.component';

describe('IdentifyThinkingTechniqueComponent', () => {
  let component: IdentifyThinkingComponent;
  let fixture: ComponentFixture<IdentifyThinkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyThinkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyThinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
