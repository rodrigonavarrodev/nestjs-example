import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')
    if (status) {
      query.andWhere('task.status = :status', {status: status }) //esto hace una busqueda exacto por status
    }
    if (search) {
      query.andWhere(
        'LOWER(task.tittle) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', 
        {search: `%${search}%`} //esto hace un busqueda parcial de la query, no hace falta que sea exacta. El LOWER convirte todo a minuscula
      )
    }
    const tasks = await query.getMany()
    return tasks
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { tittle, description } = createTaskDto;
    const task = this.create({
      tittle,
      description,
      status: TaskStatus.OPEN
    })
    await this.save(task)
    return task;
  }
}
