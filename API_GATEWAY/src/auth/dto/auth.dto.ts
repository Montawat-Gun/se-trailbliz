import { IsEmail, IsNotEmpty, IsString , IsEnum} from 'class-validator'; //ใช้เพื่อ validate (มันคือ Pipe)

export enum UserType {
  HOST = 'host',
  PARTICIPANT = 'participant',
}

export class AuthSignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserType) 
  userType: UserType;
}

export class AuthSignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
