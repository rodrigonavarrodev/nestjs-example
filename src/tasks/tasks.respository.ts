import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true })

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')
    query.where({ user })

    if (status) {
      query.andWhere('task.status = :status', {status }) //esto hace una busqueda exacto por status
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.tittle) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', 
        {search: `%${search}%`} //esto hace un busqueda parcial de la query, no hace falta que sea exacta. El LOWER convirte todo a minuscula
      )
    }

    try {
      const tasks = await query.getMany()
      return tasks
    } catch (error) {
      this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack)
      throw new InternalServerErrorException()
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { tittle, description } = createTaskDto;
    const task = this.create({
      tittle,
      description,
      status: TaskStatus.OPEN,
      user
    })
    await this.save(task)
    return task;
  }
}
