import { Task } from "../tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) //para validar que no se repitan usuarios
  username: string;

  @Column()
  password: string;

  @OneToMany(_type => Task, task => task.user, { eager: true }) //relacion entre las bases de datos //eager:ansioso significa que tambien busca las tares de ese usuario
  tasks: Task[]
}