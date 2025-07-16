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
         status: body.status
      });
      return createdProject
   }

   async updateProject(body: CreateProjectsDto, id: string): Promise<any> {
      return this.projectsModel.findByIdAndUpdate(id, body, {
         new: true,      // return the updated document
         runValidators: true, // validate the data
      }).exec();
   }
   async readProject(id: string): Promise<any> {
      const project = await this.projectsModel.findById(id).exec();
      if (!project) {
         throw new ConflictException(`Project with ID ${id} not found`);
      }
      return project;
   }


   async findAll(): Promise<any[]> {
      return this.projectsModel.find().exec();
   }
}
