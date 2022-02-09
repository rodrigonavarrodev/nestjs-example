import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task-status.enum';
export declare class Task {
    id: string;
    tittle: string;
    description: string;
    status: TaskStatus;
    user: User;
}
