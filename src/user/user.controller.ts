import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/user')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Post('create-user')
   create(@Body() body: CreateUserDto) {
      return this.usersService.createUser(body);
   }

   @Get('all-users')
   findAll() {
      const users = this.usersService.findAll();
      return users
   }
}
