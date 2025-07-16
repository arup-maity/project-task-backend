import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
   constructor(
      @Inject('USER_MODEL')
      private userModel: Model<any>,
      private jwtService: JwtService,
      private configService: ConfigService,
   ) { }


   async login(body: LoginDto): Promise<any> {
      try {
         const user = await this.userModel.findOne({ email: body.email }).exec();
         if (!user) throw new ConflictException('User not found');

         const isPasswordMatch = await bcrypt.compare(body.password, user.password);
         if (!isPasswordMatch) throw new ConflictException('Not match username and password');

         const payload = { id: user._id, name: `${user.firstname} ${user.lastname}`, email: user.email };

         const access_token = await this.jwtService.signAsync(payload)
         return { access_token, payload }

      } catch (error) {
         if (error instanceof ConflictException) {
            throw error;
         }
         throw new InternalServerErrorException('Registration failed');
      }
   }
}
