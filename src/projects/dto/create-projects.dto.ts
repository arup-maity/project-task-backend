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
}
