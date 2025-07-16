import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
   constructor(
      @Inject('USER_MODEL')
      private userModel: Model<any>,
   ) { }

   private readonly saltOrRounds = 10;

   async createUser(body: CreateUserDto): Promise<any> {
      const hashedPassword = await bcrypt.hash(body.password, this.saltOrRounds);
      const createdUser = await this.userModel.create({
         firstname: body.firstname,
         lastname: body.lastname || "",
         email: body.email,
         password: hashedPassword,
      });

      return createdUser;
   }


   async findAll(): Promise<any[]> {
      return this.userModel.find().exec();
   }
}
