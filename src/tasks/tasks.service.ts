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
         status: body.status,
         project: body.project,
         user: body.user
      });
      return createdProject
   }

   async updateTask(body: CreateTaskDto, id: string): Promise<any> {
      return this.tasksModel.findByIdAndUpdate(id, body, {
         new: true,
         runValidators: true,
      }).exec();
   }
   async readTask(id: string): Promise<any> {
      const project = await this.tasksModel.findById(id).exec();
      if (!project) {
         throw new ConflictException(`Project with ID ${id} not found`);
      }
      return project;
   }

   async findAll(userId: string, page: number, limit: number): Promise<any> {
      const [tasks, count] = await Promise.all([
         this.tasksModel.find({ user: userId }).skip((page - 1) * limit).limit(limit).populate('project').exec(),
         this.tasksModel.countDocuments({ user: userId }).exec()
      ]);

      return { tasks, count };
   }
}
