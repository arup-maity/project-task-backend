
import * as mongoose from 'mongoose';

export const databaseProviders = [
   {
      provide: 'DATABASE_CONNECTION',
      useFactory: (): Promise<typeof mongoose> =>
         mongoose.connect('mongodb+srv://arupmaitywebsite:U1YDRqqA59TYdbyL@project-task.znuyz3i.mongodb.net/'),
   },
];
