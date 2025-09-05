import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category';
import { Ring } from './ring';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  published: boolean;

  @Column()
  category: Category;

  @Column()
  ring: Ring;
}
