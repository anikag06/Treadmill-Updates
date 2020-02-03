import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigScienceComponent } from './mig-science.component';

describe('MigScienceComponent', () => {
  let component: MigScienceComponent;
  let fixture: ComponentFixture<MigScienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MigScienceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
