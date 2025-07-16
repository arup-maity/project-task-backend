import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
   imports: [
      UserModule,
      ProjectsModule,
      TasksModule
   ],
   controllers: [AppController],
   providers: [],
})
export class AppModule { }
