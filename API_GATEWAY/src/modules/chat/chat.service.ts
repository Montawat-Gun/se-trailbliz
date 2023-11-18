import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, Client, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { join } from "path";
import { ChatService, ChatId, ChatResponse, CreateNewChatRequest, InsertDataToChatByIdRequest } from "./types/types";

@Injectable()
export class ChatServiceImpl implements OnModuleInit {
  private chatService: ChatService;

  @Client({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.CHAT_BASE_URL}`,
      package: "", //ไม่ต้องประกาศ package ถ้า ใน .proto ไม่ได้ ประกาศไว้
      protoPath: join(__dirname, "/proto/chat.proto"),
    },
  })
  private client: ClientGrpc;

  onModuleInit() {
    this.chatService = this.client.getService<ChatService>("ChatService");
  }

  getChatById(id: ChatId): Observable<ChatResponse> {
    return this.chatService.getChatById(id);
  }

  createNewChat(req: CreateNewChatRequest): Observable<ChatResponse> {
    return this.chatService.createNewChat(req);
  }

  insertDataToChatById(userId:string,body: InsertDataToChatByIdRequest): Observable<ChatResponse> {
    const mappedReq = {
      id: body.id,
      data: {
        timestamp: Date.now(),
        message: body.data.message,
        sender: userId
      },
    };
    return this.chatService.insertDataToChatById(mappedReq);
  }
}
