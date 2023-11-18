import { Module } from '@nestjs/common';
import { OrganizeController } from './organize.controller';
import { OrganizeService } from './organize.service';

@Module({
  controllers: [OrganizeController],
  providers: [OrganizeService]
})
export class OrganizeModule {}
