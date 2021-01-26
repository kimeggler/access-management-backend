import { DeepPartial, Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Badge } from './badge.entity';
import { BaseEntity } from './base.entity';

@Entity('user')
export class User extends BaseEntity {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }

  @Column({ name: 'firstname' })
  public firstname: string;

  @Column({ name: 'lastname' })
  public lastname: string;

  @Column({ name: 'username' })
  public username: string;

  @Column({ name: 'password' })
  public password: string;

  @OneToMany(() => Badge, (badge) => badge.user)
  badges: Badge[];
}
