
import { Connection } from 'mongoose';
import { TasksSchema } from './schema/tasks.schema';

export const TasksProviders = [
   {
      provide: 'TASKS_MODEL',
      useFactory: (connection: Connection) => connection.model('Tasks', TasksSchema),
      inject: ['DATABASE_CONNECTION'],
   },
];
