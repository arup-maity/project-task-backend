

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
      trim: true
   },
   lastname: {
      type: String,
   },
   email: {
      type: String,
      required: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
      trim: true
   }
});