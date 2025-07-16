import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectsDto {
   @ApiProperty({
      description: 'project title',
      example: 'HRMS Project',
   })
   @IsString()
   title: string;

   @ApiProperty({
      description: 'project description',
      example: 'This is HRMS Project',
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
      description: 'user id',
      example: '68779e68110e2880dd988e13',
   })
   @IsString()
   userID: string;
}
