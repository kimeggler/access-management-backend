import {Column, DeepPartial, Entity} from 'typeorm';
import {BaseEntity} from './base.entity';

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
}
