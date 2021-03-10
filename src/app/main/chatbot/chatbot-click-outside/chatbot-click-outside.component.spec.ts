import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotClickOutsideComponent } from './chatbot-click-outside.component';

describe('ChatbotClickOutsideComponent', () => {
  let component: ChatbotClickOutsideComponent;
  let fixture: ComponentFixture<ChatbotClickOutsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbotClickOutsideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotClickOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
