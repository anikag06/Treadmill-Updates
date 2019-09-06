import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiInstructionsComponent } from './mi-instructions.component';

describe('MiInstructionsComponent', () => {
  let component: MiInstructionsComponent;
  let fixture: ComponentFixture<MiInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
