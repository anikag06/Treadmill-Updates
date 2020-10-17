import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesIntroComponent } from './resources-intro.component';

describe('ResourcesIntroComponent', () => {
  let component: ResourcesIntroComponent;
  let fixture: ComponentFixture<ResourcesIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesIntroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
