import { Module } from "@nestjs/common";
import { ChatServiceImpl } from "./chat.service";
import { ChatController } from "./chat.controller";

@Module({
  controllers: [ChatController],
  providers: [ChatServiceImpl],
})
export class ChatModule {}
