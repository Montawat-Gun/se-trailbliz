import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrganize } from '../module/organize/model/organize.model';
import { SuccessResponse } from './response.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) { }

  getAll(chatId: string) {
    return this.http.get<SuccessResponse<any>>('/chat/' + chatId)
  }

  create(userId: string, data: any) {
    return this.http.post<SuccessResponse<any>>('/chat/' + userId + '/data', data);
  }
}
