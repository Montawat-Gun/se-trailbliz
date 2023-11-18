import { Component, OnInit } from '@angular/core';
import { IOrganize } from '../../model/organize.model';
import { ChatService } from 'src/app/demo/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  isShowModal: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  toggle(value: boolean, chatId: string) {
    this.isShowModal = value;
    this.chatService.getAll(chatId).subscribe((res) => {
      console.log(res.data);
    })
  }
}
