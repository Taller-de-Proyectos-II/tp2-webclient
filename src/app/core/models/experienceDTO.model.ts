import { ConferenceDTO } from "./conferenceDTO.model";
import { CourseDTO } from "./courseDTO.model";
import { WorkExperienceDTO } from "./workExperienceDTO.model";
import { StudyDTO } from "./studyDTO.model";

export interface ExperienceDTO {
    courses: ConferenceDTO[];
    conferences: CourseDTO[];
    studies: StudyDTO[];
    workExperiences: WorkExperienceDTO[];
}