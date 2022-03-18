import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  age: number;

  @Column({ nullable: false, default: 'DEFAULT_V2' })
  v2: string;
}
