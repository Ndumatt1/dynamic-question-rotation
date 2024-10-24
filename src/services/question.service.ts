import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { QuestionRepository } from '../repositories/question.repository';
import { RegionQuestionRepository } from 'src/repositories/region-question.repository';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(private readonly questionRepository: QuestionRepository, private readonly regionQuestionRespository: RegionQuestionRepository) { }

  async getQuestionForRegion(region: string) {
    const curretQuestion = await this.regionQuestionRespository.getCurrentRegionCurrentQuestion(region);


    this.logger.log(`Current question for ${region}: ${JSON.stringify(curretQuestion)}`)

    if (curretQuestion) {
      return {
        question: curretQuestion.currentQuestion.content,
        id: curretQuestion.currentQuestion.id,
        createdAt: curretQuestion.currentQuestion.createdAt,
      }
    } else {
      throw new HttpException('No question found for this region!', HttpStatus.NOT_FOUND);
    }
  }

  async getNextQuestionForRegion(region: string) {
    // Retrieve unassigned questions for the region
    const questions = await this.questionRepository.getUnassignedQuestions(region);
    if (questions.length > 0) {
      return questions[0]; // Return the next available question
    } else {
      // Handle the case when all questions have been assigned (e.g., restart cycle)
      return await this.questionRepository.getFirstQuestion();
    }
  }

  async assignNewQuestionsToRegions() {
    const regions = ['Singapore', 'US']; // This can be dynamic by creating a region entity

    for (const region of regions) {
      // Get the current question for the region
      // const currentQuestion = await this.regionQuestionRespository.getCurrentRegionCurrentQuestion(region);

      // Retrieve unassigned questions for the region
      const unassignedQuestions = await this.questionRepository.getUnassignedQuestions(region);
      // For example, you could decide to keep the current question or handle it differently
      // For now, just logging it
      const questionToAssign = unassignedQuestions.length > 0 ? unassignedQuestions[0] : await this.questionRepository.getFirstQuestion();

      await this.regionQuestionRespository.assignNewQuestion(region, questionToAssign);
    }
  }

}