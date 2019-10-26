import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbGameInstructionsComponent } from './ib-game-instructions.component';

describe('IbGameInstructionsComponent', () => {
  let component: IbGameInstructionsComponent;
  let fixture: ComponentFixture<IbGameInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbGameInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbGameInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
