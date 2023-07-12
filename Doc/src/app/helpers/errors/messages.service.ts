import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class MessagesService {
  messages: string[] = [];

  add(message: string){
    this.messages.push(message)
  }
  clear(){
    this.messages = [];
  }
}