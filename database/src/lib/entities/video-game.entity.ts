
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class VideoGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('numeric')
  price: number;

  @ManyToOne(() => Category, (category) => category.videoGames)
  category: Category;
}