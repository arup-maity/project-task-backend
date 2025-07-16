import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectsDto } from './dto/create-projects.dto';

@Controller('api/projects')
export class ProjectsController {
   constructor(private readonly projectService: ProjectsService) { }

   @Post('create-project')
   create(@Body() body: CreateProjectsDto) {
      return this.projectService.createProject(body);
   }

   @Put('update-project/:id')
   update(@Param('id') id: string, @Body() body: CreateProjectsDto) {
      return this.projectService.updateProject(body, id);
   }

   @Get('read-project/:id')
   read(@Param('id') id: string) {
      return this.projectService.readProject(id);
   }

   @Get('all-projects')
   findAll() {
      const projects = this.projectService.findAll();
      return projects
   }
}
