import { QuestionDTO } from "./questionDTO.model";

export interface AnswerDTO {
    idAnswer: number,
    score: number,
    questionDTO: QuestionDTO
}