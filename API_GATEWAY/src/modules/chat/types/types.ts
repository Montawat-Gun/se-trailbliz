import { Observable } from "rxjs";

export interface ChatService {
    getChatById(id: ChatId): Observable<ChatResponse>;
    createNewChat(data: CreateNewChatRequest): Observable<ChatResponse>;
    insertDataToChatById(data: InsertDataToChatByIdRequest): Observable<ChatResponse>;
  }
  
  export interface ChatId {
    id: string;
  }
  
  export interface CreateNewChatRequest {
    data: Data[];
  }
  
  export interface InsertDataToChatByIdRequest {
    id: string;
    data: Data;
  }
  
  export interface ChatResponse {
    id: string;
    data: Data[];
  }
  
  export interface Data {
    timestamp: number;
    sender: string;
    message: string;
  }