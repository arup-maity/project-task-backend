import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
   imports: [
      DatabaseModule,
      JwtModule.register({
         global: true,
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '2d' },
      })
   ],
   controllers: [AuthController],
   providers: [
      AuthService,
      ...AuthProviders,
   ],
})
export class AuthModule { }
