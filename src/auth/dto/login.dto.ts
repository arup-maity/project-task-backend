import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
   @ApiProperty({
      description: 'enter your email',
      example: 'example@gmail.com',
   })
   @IsEmail()
   email: string;

   @ApiProperty({
      description: 'enter your password',
      example: 'Qwerty@123',
   })
   @IsString()
   password: string;
}
