import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.respository';
import { Task } from './task.entity';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTaskSatus(id: string, status: TaskStatus): Promise<Task>;
}
