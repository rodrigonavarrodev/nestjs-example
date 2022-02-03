import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
export declare class TasksRepository extends Repository<Task> {
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
