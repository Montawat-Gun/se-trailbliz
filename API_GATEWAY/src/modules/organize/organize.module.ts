import { Module } from '@nestjs/common';
import { OrganizeController } from './organize.controller';
import { OrganizeService } from './organize.service';
import { ChatServiceImpl } from '../chat/chat.service';

@Module({
  controllers: [OrganizeController],
  providers: [OrganizeService,ChatServiceImpl]
})
export class OrganizeModule {}
