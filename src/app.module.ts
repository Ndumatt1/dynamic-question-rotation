import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { ConfigModule } from '@nestjs/config';
import { SchedulerService } from './scheduler/cycle.scheduler';
import { QuestionModule } from './modules/question.module';
import { RegionQuestionRepository } from './repositories/region-question.repository';
import * as path from 'path';
import { DatabaseModule } from './database/database.module';
import { TypeOrmExModule } from './typeorm-extension/typeorm-ex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    TypeOrmExModule.forCustomRepository([RegionQuestionRepository]),
    QuestionModule,
  ],
  controllers: [AppController, QuestionController],
  providers: [AppService, QuestionService, SchedulerService],
})
export class AppModule { }
