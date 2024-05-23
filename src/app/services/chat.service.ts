import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable} from 'rxjs';
import { IMessage } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
 /**
 * Service for managing chat functionality.
 */
export class ChatService {

  /**
   * Creates an instance of ChatService.
   * @param {Socket} socket - The Socket instance for handling communication.
   */
  constructor(private socket: Socket) { }

  /**
   * Sends a message to the chat server.
   * @param {IMessage} message - The message to be sent.
   */
    public sendMessage(message: IMessage) {
      this.socket.emit('message', message);
    }

  /**
   * Retrieves messages from the chat server.
   * @returns {Observable<IMessage>} An Observable that emits received messages.
   */
  public getMessages(): Observable<IMessage> {
    return this.socket.fromEvent<IMessage>('received')
  }
}
