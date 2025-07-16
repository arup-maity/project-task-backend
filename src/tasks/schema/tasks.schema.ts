

import * as mongoose from 'mongoose';

export const TasksSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true
   },
   description: {
      type: String,
      required: true,
      trim: true
   },
   status: {
      type: String,
      required: true,
      trim: true
   },
   user: { type: mongoose.Types.ObjectId, ref: 'User' },
   project: { type: mongoose.Types.ObjectId, ref: 'Projects' },
});