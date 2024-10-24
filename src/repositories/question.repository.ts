import { Repository } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from 'src/typeorm-extension/typeorm-ex.decorator';

@CustomRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async getUnassignedQuestions(region: string): Promise<Question[]> {
    return this.createQueryBuilder('question')
      .where('NOT :region = ANY(question.regionsServed)', { region })
      .getMany();
  }

  async assignQuestionToRegion(question: Question, region: string) {
    question.regionsServed = [...question.regionsServed, region];
    question.assignedAt = new Date();
    await this.save(question);
  }

  async getFirstQuestion(): Promise<Question> {
    return this.createQueryBuilder('question')
      .orderBy('createdAt', 'ASC')
      .getOne();
  }

  async getCurrentQuestionForRegion(region: string): Promise<Question> {
    return this.createQueryBuilder('question')
      .where('regionsServed LIKE :region', { region: `%${region}%` })
      .orderBy('assignedAt', 'DESC')
      .getOne();
  }
}
