import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTaskDto {
   @ApiProperty({
      description: 'task title',
      example: 'added features',
   })
   @IsString()
   title: string;

   @ApiProperty({
      description: 'task description',
      example: 'added features description',
   })
   @IsString()
   description: string;

   @ApiProperty({
      description: 'status',
      example: 'active',
   })
   @IsString()
   status: string;

   @ApiProperty({
      description: 'User ID',
      example: '68779e68110e2880dd988e13',
   })
   @IsString()
   user: string;

   @ApiProperty({
      description: 'Project ID',
      example: '68779e68110e2880dd988e13',
   })
   @IsString()
   project: string;
}
