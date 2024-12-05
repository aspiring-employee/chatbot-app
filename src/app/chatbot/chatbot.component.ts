import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit {
  userInput: string = '';
  chatMessages: { sender: string; text: string }[] = [];
  recognition: any;

  ngOnInit(): void {
    // Initialize chat with system message
    this.chatMessages.push({
      sender: 'system',
      text: 'Hello Mr. John. What would you like to explore today?\n1. Technology\n2. Industry\n3. Healthcare',
    });

    // Setup voice recognition
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.userInput = transcript;
        this.sendMessage();
      };
    } else {
      console.error('Speech Recognition API not supported in this browser.');
    }
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      // Add user message
      this.chatMessages.push({ sender: 'user', text: this.userInput });

      // Generate a response based on the input
      const response = this.generateResponse(this.userInput);
      this.chatMessages.push({ sender: 'system', text: response });

      // Clear input
      this.userInput = '';
    }
  }

  startVoiceRecognition(): void {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  generateResponse(input: string): string {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('technology')) {
      return 'Sure! Here are your updates for technology.\n1. Update 1\n2. Update 2';
    } else if (lowerInput.includes('industry')) {
      return 'Sure! Here are your updates for industry.\n1. Update 1\n2. Update 2';
    } else if (lowerInput.includes('healthcare')) {
      return 'Sure! Here are your updates for healthcare.\n1. Update 1\n2. Update 2';
    } else {
      return 'Sorry, I did not understand that. Please choose from Technology, Industry, or Healthcare.';
    }
  }
}
