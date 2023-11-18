import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //ทำให้ที่อยู่ใน export เป็น global จะได้ import ตาม auth.module หรือ module อื่นๆได้เลย
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
