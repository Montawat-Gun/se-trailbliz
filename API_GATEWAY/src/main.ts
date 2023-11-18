import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3333;
  await app.listen(port);
}
bootstrap();

/*
-set up nodemon ตามวิธีไฟล์ใน note ของโฟลเดอร์นี้
-ใช้ yarn dev เพื่อ รันแอพ
-ใช้ nest g moduleName  เพื่อสร้าง module แล้วจะถูกอิมพอทใน app.module ให้เลย
-เขียนไฟล์ Docker Compose เรียก DB
-docker compose up api-db -d 
-ไปแก้ใน package.json เพื่อสร้าง automated script ในการ migration และสร้าง container ใหม่
    "db:dev:rm": "docker compose rm api-db -s -f -v",
    "db:dev:up": "docker compose up api-db -d",
    "prisma:dev:deploy": "prisma migrate deploy",
    "db:dev:restart": "yarn db:dev:rm && yarn db:dev:up && sleep 1 && yarn prisma:dev:deploy"
-ทำ TypeORM ลง yarn add prisma -D  กับ @prisma/client (ตัวไคลเอนท์ไม่ต้อง -D) เสดปุ๊ปให้รัน npm init
-สร้าง model ใน schema.prisma
-npx prisma migrate dev เพื่อเพิ่มหรือเปลี่ยนแปลงโมเดลในไฟล์ prisma/schema.prisma
-nest g module prisma สร้างไฟล์ module (ใส่ Global ด้วย)
-nest g service prisma --no-spec สร้างไฟล์ service
-ไป extend class PrismaService
-npx prisma studio เปิดใช้งานเซิฟเวอร์ ui ของ prisma (สามารถใช้ port อื่นแทน 5555 ได้ โดยใส่ --port 9898)

-yarn add @nestjs/config //เพื่อเรียก URL DB จาก env ใน prisma.service
-import Config ลงใน app.module

-yarn add  @nestjs/passport passport @nestjs/jwt passport-jwt ลง passport.js และ jwt 
-yarn add -D @types/passport-jwt สำหรับเขียน ts
-import JwtModule ลงใน auth.module
-ใส่ JwtService ใน auth.service

-สร้าง strategy เพื่อ แจก  token 
-ใช้ UseGuards() ใน user.controller เพื่อป้องกันคนที่ไม่มี token เข้าถึง router ใน user
- สร้าง jwt.guard (custom guard) เผื่อใช้ปรับเปลี่ยนโครงสร้างขอว AuthGuard โดยการ extend มา
*/
