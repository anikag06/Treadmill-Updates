import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCardComponent } from './section-card.component';
import { Section } from '@/main/shared/section.model';

describe('SectionCardComponent', () => {
  let component: SectionCardComponent;
  let fixture: ComponentFixture<SectionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCardComponent);
    component = fixture.componentInstance;
    component.section = new Section('Test', 1, 'basics', false, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
