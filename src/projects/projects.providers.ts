
import { Connection } from 'mongoose';
import { ProjectsSchema } from './schema/project.schems';

export const projectsProviders = [
   {
      provide: 'PROJECTS_MODEL',
      useFactory: (connection: Connection) => connection.model('Projects', ProjectsSchema),
      inject: ['DATABASE_CONNECTION'],
   },
];
