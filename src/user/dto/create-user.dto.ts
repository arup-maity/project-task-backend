import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
   @ApiProperty({
      description: 'user firstname',
      example: 'Arup',
   })
   @IsString()
   firstname: string;

   @ApiProperty({
      description: 'user lastname',
      example: 'Maity',
   })
   @IsString()
   lastname: string;

   @ApiProperty({
      description: 'user email',
      example: 'WnMwI@example.com',
   })
   @IsEmail()
   email: string;

   @ApiProperty({
      description: 'user password',
      example: 'password',
   })
   @IsString()
   password: string;
}
