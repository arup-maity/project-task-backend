import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {
   constructor(
      @Inject('TASKS_MODEL')
      private tasksModel: Model<any>,
   ) { }


   async createTask(body: CreateTaskDto): Promise<any> {
      const createdProject = await this.tasksModel.create({
         title: body.title,
         description: body.description,
         status: body.status
      });
      return createdProject
   }

   async updateTask(body: CreateTaskDto, id: string): Promise<any> {
      return this.tasksModel.findByIdAndUpdate(id, body, {
         new: true,      // return the updated document
         runValidators: true, // validate the data
      }).exec();
   }
   async readTask(id: string): Promise<any> {
      const project = await this.tasksModel.findById(id).exec();
      if (!project) {
         throw new ConflictException(`Project with ID ${id} not found`);
      }
      return project;
   }

   async findAll(): Promise<any[]> {
      return this.tasksModel.find().exec();
   }
}
