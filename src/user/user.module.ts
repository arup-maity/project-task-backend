import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { userProviders } from './user.providers';

import { UsersService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
   controllers: [UsersController],
   providers: [
      UsersService,
      ...userProviders,
   ],
})
export class UserModule { }
