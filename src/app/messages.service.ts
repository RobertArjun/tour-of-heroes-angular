import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class MessagesService {
  messages: string[] = [];
  constructor() { console.log('loading'); }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}