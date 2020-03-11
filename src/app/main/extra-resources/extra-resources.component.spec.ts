import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraResourcesComponent } from './extra-resources.component';

describe('Resources2Component', () => {
  let component: ExtraResourcesComponent;
  let fixture: ComponentFixture<ExtraResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraResourcesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
