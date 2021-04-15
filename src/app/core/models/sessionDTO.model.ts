import {PsychologistDTO} from './psychologistDTO.model'
import {PatientDTO} from './patientDTO.model'
import {ScheduleDTO} from './scheduleDTO.model'

export interface SessionDTO {
    idSession: number;
    date: string,
    meetingLink: string,
    acepted: boolean,
    finished: boolean,
    psychologist: PsychologistDTO;
    patient: PatientDTO;
    schedule: ScheduleDTO;
}