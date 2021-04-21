import { QuestionDTO } from "./questionDTO.model";

export interface QuestionTypeDTO {
    idQuestionType: number;
    name: string;
    description: string;
    questionsDTO: QuestionDTO[];
}