import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeStyleGameComponent } from './attribute-style-game.component';

describe('AttributeStyleGameComponent', () => {
  let component: AttributeStyleGameComponent;
  let fixture: ComponentFixture<AttributeStyleGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeStyleGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeStyleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
