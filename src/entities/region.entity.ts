import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'region_question' })
export class RegionQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @ManyToOne(() => Question, { eager: true })
  currentQuestion: Question;

  @Column()
  assignedAt: Date;
}
