import { Role } from 'src/role/role';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;
  @Column({ length: 100, nullable: false })
  name: string;
  @Column({ length: 100, nullable: false })
  lastname: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ type: 'date', nullable: false })
  birthdate: Date;
  @Column({ length: 128, nullable: false })
  password: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'enum', enum: Role, default: Role.USER, nullable: false })
  role: Role;
}
