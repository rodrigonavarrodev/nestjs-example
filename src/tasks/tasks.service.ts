import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ){}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto)
  }
  
   async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id)
    if(!task) {
      throw new NotFoundException();
    }
    return task
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id)
    //esto esta raro, para hacer solo una consulta a la base antes no llama para ver si existe
    if(result.affected === 0) {
      throw new NotFoundException()
    }
  }

  async updateTaskSatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task)
    return task
  }

}
