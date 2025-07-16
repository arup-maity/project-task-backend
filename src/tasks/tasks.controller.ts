import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('api/tasks')
export class TasksController {
   constructor(private readonly taskService: TasksService) { }

   @Post('create-task')
   create(@Body() body: CreateTaskDto) {
      return this.taskService.createTask(body);
   }

   @Put('update-task/:id')
   update(@Param('id') id: string, @Body() body: CreateTaskDto) {
      return this.taskService.updateTask(body, id);
   }

   @Get('read-task/:id')
   read(@Param('id') id: string) {
      return this.taskService.readTask(id);
   }

   @Get('all-tasks')
   findAll(
      @Query('userId') user: string,
      @Query('page') page = 1,
      @Query('limit') limit = 10
   ) {
      const tasks = this.taskService.findAll(user, +page, +limit);
      return tasks
   }
}
