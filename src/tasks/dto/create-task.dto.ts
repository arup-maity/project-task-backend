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
}
