import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../shared/db/typeorm/model/abstract.entity';

@Entity('developers')
export class DevelopersEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  sex: string;

  @Column()
  age: number;

  @Column()
  hobby: string;

  @Column()
  date_of_birth: Date;
}
