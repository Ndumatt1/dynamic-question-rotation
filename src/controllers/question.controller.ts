import { Controller, Get, Query } from '@nestjs/common';
import { QuestionService } from 'src/services/question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Get()
  async getQuestion(@Query('region') region: string) {
    const question = await this.questionService.getQuestionForRegion(region);

    return {
      success: true,
      region,
      question,
    }
  }
}
