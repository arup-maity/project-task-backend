import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { projectsProviders } from './projects.providers';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
   imports: [DatabaseModule],
   controllers: [ProjectsController],
   providers: [
      ProjectsService,
      ...projectsProviders,
   ],
})
export class ProjectsModule { }
