import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  //ไปเติม "jwt" ใน jwt.strategyด้วย เ
  constructor() {
    super();
  }
}

//constructor เป็นเมธอดพิเศษในคลาส (class) ที่จะถูกเรียกโดยอัตโนมัติเมื่อมีการสร้างอินสแตนซ์ (instance) ใหม่ของคลาสนั้น
//super เป็นคำสั่งพิเศษที่ใช้ในคลาสย่อย (subclass) เพื่อเรียกเมธอดที่สอดคล้องกับคลาสแม่ (parent class) ใน constructor ของคลาสย่อย, คุณจำเป็นต้องใช้ super เมื่อคุณต้องการส่งอาร์กิวเมนต์ไปยัง constructor ของคลาสแม่
