import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  is: string;

  @Column({ unique: true }) //para validar que no se repitan usuarios
  username: string;

  @Column()
  password: string;
}