import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IMessage } from '../../interfaces/message.interface';

/**
 * Component for managing chat functionality.
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  public messageContent: string = '';
  public messagesReceived: IMessage[] = [];

  /**
   * Creates an instance of ChatComponent.
   * @param {ChatService} chatService - The ChatService instance for managing chat operations.
   */
  constructor(private chatService: ChatService) { }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    // Subscribe to receive messages from the chat service
    this.chatService.getMessages().subscribe((message: IMessage) => {
      this.messagesReceived.push(message);
    });
  }

  /**
   * Sends a message to the chat server.
   */
  public sendMessage(): void {
    // Check if the message content is not empty
    if (this.messageContent.trim()) {
      // Create a new message object with current content and timestamp
      const newMessage: IMessage = {
        content: this.messageContent,
        timestamp: new Date()
      };
      // Send the new message to the chat service
      this.chatService.sendMessage(newMessage);
      // Clear the message input field
      this.messageContent = '';
    }
  }
  
}
