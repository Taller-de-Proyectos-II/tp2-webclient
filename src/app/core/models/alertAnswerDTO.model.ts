import { SymptomDTO } from "./symptomDTO.model";

export interface AlertAnswerDTO {
    idAlertAnswer: number,
    score: number,
    symptomDTO: SymptomDTO;
}