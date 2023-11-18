import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

//ไฟล์ Module มักจะมีหน้าที่เป็นตัวกลางในการจัดการและกำหนดความสัมพันธ์ระหว่าง Class และ Service ต่างๆ ในแอปพลิเคชัน โดยไฟล์ Module จะประกอบด้วย Class ที่มีหน้าที่สร้าง instance ของ Service และ Controller เพื่อเชื่อมโยงการทำงานของแอปพลิเคชัน
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], //ใส่ JwtStraegy
})
export class AuthModule {}
