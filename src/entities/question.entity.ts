import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'simple-array', nullable: true })
  regionsServed: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assignedAt: Date

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}