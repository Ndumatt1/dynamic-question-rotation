import { Module } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { QuestionRepository } from '../repositories/question.repository';
import { TypeOrmExModule } from 'src/typeorm-extension/typeorm-ex.module';
import { RegionQuestionRepository } from '../repositories/region-question.repository'; // Import if needed
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { RegionQuestion } from 'src/entities/region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, RegionQuestion]),
    TypeOrmExModule.forCustomRepository([QuestionRepository, RegionQuestionRepository]),
  ],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionService, QuestionRepository],
})
export class QuestionModule { }
