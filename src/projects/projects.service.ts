import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProjectsDto } from './dto/create-projects.dto';


@Injectable()
export class ProjectsService {
   constructor(
      @Inject('PROJECTS_MODEL')
      private projectsModel: Model<any>,
   ) { }


   async createProject(body: CreateProjectsDto): Promise<any> {
      const createdProject = await this.projectsModel.create({
         title: body.title,
         description: body.description,
         status: body.status,
         user: body.userID
      });
      return createdProject
   }

   async updateProject(body: CreateProjectsDto, id: string): Promise<any> {
      return this.projectsModel.findByIdAndUpdate(id, body, {
         new: true,
         runValidators: true,
      }).exec();
   }
   async readProject(id: string): Promise<any> {
      const project = await this.projectsModel.findById(id).exec();
      if (!project) {
         throw new ConflictException(`Project with ID ${id} not found`);
      }
      return project;
   }


   async findAll(userId: string, page: number, limit: number): Promise<any> {
      const [projects, count] = await Promise.all([
         this.projectsModel.find({ user: userId }).skip((page - 1) * limit).limit(limit).exec(),
         this.projectsModel.countDocuments({ user: userId }).exec()
      ]);

      return { projects, count };
   }
}
