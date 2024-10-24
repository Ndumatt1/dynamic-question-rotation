import { Repository } from 'typeorm';
import { RegionQuestion } from 'src/entities/region.entity';
import { Question } from 'src/entities/question.entity';
import { CustomRepository } from 'src/typeorm-extension/typeorm-ex.decorator';

@CustomRepository(RegionQuestion)
export class RegionQuestionRepository extends Repository<RegionQuestion> {
  // Get the current question assigned to a region
  async getCurrentRegionCurrentQuestion(region: string): Promise<RegionQuestion | null> {
    return this.createQueryBuilder('region_question')
      .leftJoinAndSelect('region_question.currentQuestion', 'question')
      .where('region_question.region = :region', { region })
      .getOne();
  }

  // Assign a new question to a region
  async assignNewQuestion(region: string, question: Question) {
    let assignedQuestion = await this.getCurrentRegionCurrentQuestion(region);

    if (!assignedQuestion) {
      assignedQuestion = new RegionQuestion();
      assignedQuestion.region = region;
    }

    assignedQuestion.currentQuestion = question;
    assignedQuestion.assignedAt = new Date();
    await this.save(assignedQuestion);
  }
}
