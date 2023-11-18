import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {  AuthSignInDto, AuthSignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private confing: ConfigService,
  ) {}

  async signup(dto: AuthSignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          userType: dto.userType
        },
      });
      return this.signToken(user.id, user.email ,user.userType);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials Taken');
      } else throw error; 
    }
  }

  async signin(dto: AuthSignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email ,user.userType);
  }

  async signToken(
    userId: number,
    email: string,
    userType: string, 
  ): Promise<{ userId: number; email: string; userType: string; access_token: string }> {
    const payload = {
      sub: userId,
      email,
      userType, 
    };
    const secret = this.confing.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '150d',
      secret: secret,
    });
    return {
      userId,
      email,
      userType, 
      access_token: token,
    };
  }
}
