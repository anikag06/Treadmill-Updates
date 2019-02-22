import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSlideComponent } from './module-slide.component';

describe('ModuleSlideComponent', () => {
  let component: ModuleSlideComponent;
  let fixture: ComponentFixture<ModuleSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
