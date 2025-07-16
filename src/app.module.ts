import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
@Module({
   imports: [
      UserModule,
      ProjectsModule,
      TasksModule,
      AuthModule,
      ConfigModule.forRoot({
         load: [configuration],
         isGlobal: true,
      }),
   ],
   controllers: [AppController],
   providers: [],
})
export class AppModule { }
