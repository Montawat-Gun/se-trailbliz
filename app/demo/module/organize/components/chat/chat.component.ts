import { Component } from '@angular/core';
import { IOrganize } from '../../model/organize.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  isShowModal: boolean = false;

  toggle(value: boolean, orgId: number) {
    this.isShowModal = value;
  }
}
