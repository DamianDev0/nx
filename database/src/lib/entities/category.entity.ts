import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VideoGame } from './video-game.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => VideoGame, (videoGame) => videoGame.category)
  videoGames: VideoGame[];
}
