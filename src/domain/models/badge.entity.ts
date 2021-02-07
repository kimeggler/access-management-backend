import { Column, DeepPartial, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('badge')
export class Badge extends BaseEntity {
  constructor(input?: DeepPartial<Badge>) {
    super(input);
  }

  @Column({ name: 'identifier' })
  public identifier: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;
}
