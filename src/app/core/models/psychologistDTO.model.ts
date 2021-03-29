import { UserLoginDTO } from "./userLoginDTO.model";

export interface PsychologistDTO {
    birthday: string;
    cpsp: string;
    description: string;
    email: string;
    lastNames: string;
    names: string;
    phone: string;
    userLoginDTO: UserLoginDTO;
  }