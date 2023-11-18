import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ChatServiceImpl } from "./chat.service";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { ChatResponse, InsertDataToChatByIdRequest } from "./types/types";

@UseGuards(JwtGuard)
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatServiceImpl) {}

  @Post()
  async createNewChat(@Body() data: any): Promise<ChatResponse> {
    try {
      return await this.chatService.createNewChat(data).toPromise();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getChatById(@Param("id") id: string): Promise<ChatResponse> {
    try {
      return await this.chatService.getChatById({ id }).toPromise();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post(":userId/data")
  async insertDataToChatById(@Param() params : any ,@Body() body: InsertDataToChatByIdRequest): Promise<ChatResponse> {
    try {
      return await this.chatService.insertDataToChatById(params.userId,body).toPromise();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
