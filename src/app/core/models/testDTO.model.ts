import { AnswerDTO } from './answerDTO.model';

export interface TestDTO {
  idTest: number;
  startDate: string;
  endDate: string;
  finished: boolean;
  testType: string;
  diagnostic: string;
  answersDTO: AnswerDTO[];
  color: string;
}
