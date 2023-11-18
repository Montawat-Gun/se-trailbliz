import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/demo/service/chat.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  userId: string;
  chatId: string;
  isShowModal: boolean = false;
  chats: { message: string, sender: string }[] = [];
  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id_ref');
  }

  toggle(value: boolean, chatId: string) {
    this.isShowModal = value;
    this.chatId = chatId;
    interval(500).subscribe((res) => {
      this.init();
    });
  }

  init() {
    this.chatService.getAll(this.chatId).subscribe((res) => {
      if (res.data) {
        this.chats = res.data;
      }
    })
  }

  send() {
    if (!this.message) return;
    const userId = localStorage.getItem('user_id_ref');
    const data = {
      id: this.chatId,
      data: {
        message: this.message,
        sender: localStorage.getItem('user_id_ref')
      }
    }
    this.chatService.create(userId, data).subscribe(() => {
    })
  }
}
