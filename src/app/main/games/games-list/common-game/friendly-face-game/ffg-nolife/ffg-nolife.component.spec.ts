import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfgNolifeComponent } from './ffg-nolife.component';

describe('FfgNolifeComponent', () => {
  let component: FfgNolifeComponent;
  let fixture: ComponentFixture<FfgNolifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfgNolifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfgNolifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
