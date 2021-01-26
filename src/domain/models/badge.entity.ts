import {
  DeepPartial,
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('badge')
export class Badge extends BaseEntity {
  constructor(input?: DeepPartial<Badge>) {
    super(input);
  }

  @Column({ name: 'identifier' })
  public firstname: string;

  @Column({ name: 'secret' })
  public lastname: string;

  @ManyToOne(() => User, (user) => user.badges)
  public user: User;
}
