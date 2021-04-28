import { AlertAnswerDTO } from './alertAnswerDTO.model';
export interface AlertDTO {
  idAlert: number;
  date: string;
  hour: string;
  important: boolean;
  alertAnswersDTO: AlertAnswerDTO[];
}
