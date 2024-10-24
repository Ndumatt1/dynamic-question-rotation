import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as cron from 'node-cron';
import { QuestionService } from 'src/services/question.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SchedulerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SchedulerService.name);
  private cronJob: cron.ScheduledTask;

  constructor(
    private readonly questionService: QuestionService,
    private readonly config: ConfigService,
  ) { }

  onModuleInit() {
    this.startCronJob();
  }

  onModuleDestroy() {
    this.cronJob?.stop();
  }

  private startCronJob() {
    const cycleDays = this.config.get<number>('CYCLE', 7) || 7; // Default to 7 days if undefined
    const cronExpression = `0 7 */${cycleDays} * *`; // Run at 7 AM every cycleDays

    this.cronJob = cron.schedule(cronExpression, async () => {
      this.logger.log(`Running scheduled job for cycle: ${cycleDays} days`);

      await this.questionService.assignNewQuestionsToRegions();
    });

    this.logger.log(`Cron job scheduled with expression: ${cronExpression}`);
  }
}

