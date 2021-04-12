import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '@/main/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot-click-outside',
  templateUrl: './chatbot-click-outside.component.html',
  styleUrls: ['./chatbot-click-outside.component.scss'],
})
export class ChatbotClickOutsideComponent implements OnInit {
  showMessage = true;
  xPosition!: number;
  yPosition!: number;
  constructor(private chatbotService: ChatbotService) {}
  ngOnInit() {}
}
