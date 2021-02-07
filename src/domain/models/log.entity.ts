import { Column, DeepPartial, Entity } from 'typeorm';
import { LogTypeENUM } from '../enums/logtype';
import { BaseEntity } from './base.entity';

@Entity('badge')
export class Log extends BaseEntity {
  constructor(input?: DeepPartial<Log>) {
    super(input);
  }

  @Column({ name: 'identifier' })
  public log: string;

  @Column({ name: 'type' })
  public type: LogTypeENUM;
}
